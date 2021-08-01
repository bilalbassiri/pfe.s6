const Users = require("../models/User");
const Orders = require("../models/Order");
const Books = require("../models/Book");
const Reviews = require("../models/Review");
const Mails = require("../models/Mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const saltRounds = 10;

const getUserInterests = (list) => {
  let g = "";
  for (let i in list.read) {
    g += list.read[i].genres.join(",") + ",";
  }
  for (let i in list.currently_reading) {
    g += list.currently_reading[i].genres.join(",") + ",";
  }
  for (let i in list.to_read) {
    g += list.to_read[i].genres.join(",") + ",";
  }
  return g.length ? _.union(g.substring(0, g.length - 1).split(",")) : [];
};
const controllers = {
  register: async (req, res) => {
    try {
      const { first_name, last_name, username, email, password } = req.body;
      const emailExists = await Users.exists({ email });
      const usernameExists = await Users.exists({ username });
      if (usernameExists)
        return res.status(200).json({
          err: {
            emailErr: emailExists ? "This email address already exist" : false,
            usernameErr: usernameExists ? `${username} has been taken` : false,
          },
          signed: false,
        });
      const passwordHash = await bcrypt.hash(password, saltRounds); // Password Encryption
      const newUser = new Users({
        name: first_name + " " + last_name,
        username,
        email,
        password: passwordHash,
        new_notifications: [
          {
            picture:
              "https://www.pngkit.com/png/detail/148-1485970_related-wallpapers-hand-wave-emoji-png.png",
            name: "Kafka",
            direction: "/readers/me",
            date: new Date(),
            content: `Hi <span class='name'>${first_name} 👋</span>, you're welcome in our community.<br/>Add your picture and tell something about you on your profile, <b>Enjoy your journey </b> 🎉 `,
          },
        ],
      });
      newUser.save(); // Save mongoDB
      const ACCESS_TOKEN = createAccessToken({ id: newUser._id });
      const REFRESH_TOKEN = createRefreshToken({ id: newUser._id });
      res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      return res.json({ ACCESS_TOKEN, credentials: newUser, signed: true });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user || !user.active) {
        res.json({ msg: "Invalid email address!", logged: false });
      } else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const ACCESS_TOKEN = createAccessToken({ id: user._id });
          const REFRESH_TOKEN = createRefreshToken({ id: user._id });
          res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
            httpOnly: true,
            path: "/user/refresh_token",
          });
          return res.json({ ACCESS_TOKEN, logged: true });
        } else res.json({ msg: "Incorrect password!", logged: false });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      await res.clearCookie("REFRESH_TOKEN", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out successfully ✔️" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = await req.user;
      const { read, currently_reading, to_read, highlights } =
        await Users.findById(id)
          .populate({
            path: "read currently_reading to_read",
            select: "genres",
          })
          .select("read currently_reading to_read highlights");
      const genres = getUserInterests({ read, currently_reading, to_read });
      const user = await Users.findByIdAndUpdate(
        id,
        { genres },
        { new: true }
      ).populate("cart favoris orders");
      const readers = await Users.find({
        highlights: { $nin: id },
        _id: { $ne: id },
      })
        .select("name username picture")
        .limit(10);
      if (!user) return res.json(null);
      user.readers = readers;
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  highlightReader: async (req, res) => {
    try {
      const { _id, newHighlights } = req.body;
      const { highlights } = await Users.findByIdAndUpdate(
        _id,
        { highlights: newHighlights },
        { new: true }
      )
        .select("highlights")
        .populate({ path: "highlights", select: "name username picture" });
      return res.status(200).json({ highlights });
    } catch (error) {
      console.log(error.message);
    }
  },
  updateUserInfo: async (req, res) => {
    try {
      const { id } = req.user;
      const updatedUser = await Users.findByIdAndUpdate(id, req.body, {
        new: true,
      }).populate({
        path: "read currently_reading to_read ",
        select: "name rating price genres",
      });
      if (!updatedUser) return res.status.json({ msg: "Failed" });
      else return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error.message);
    }
  },
  updateNotifications: async (req, res) => {
    try {
      const { _id, notification, action } = req.body;
      const { notifications, new_notifications } = await Users.findOne({ _id });
      if (action === "read") {
        await Users.findByIdAndUpdate(_id, {
          notifications: [...new_notifications, ...notifications],
          new_notifications: [],
        });
      } else {
        const filtred_notifications = new_notifications.filter(
          (item) => item.content !== notification.content
        );
        await Users.findByIdAndUpdate(_id, {
          notifications: [...new_notifications, ...notifications].filter(
            (item) => item.content !== notification.content
          ),
          new_notifications: [notification, ...filtred_notifications],
        });
      }
      return;
    } catch (error) {
      console.log(error.message);
    }
  },
  updateCart: async (req, res) => {
    try {
      const { id } = req.user;
      const { cart } = req.body;
      const result = await Users.findByIdAndUpdate(id, { cart }, { new: true })
        .populate("cart")
        .select("cart");
      return res.json(result.cart);
    } catch (err) {
      return res.status(500).json({ msg: "1" + err.message });
    }
  },
  updateFavoris: async (req, res) => {
    try {
      const { id } = req.user;
      const { favoris } = req.body;
      const result = await Users.findByIdAndUpdate(
        id,
        { favoris },
        { new: true }
      )
        .populate("favoris")
        .select("favoris");
      return res.json(result.favoris);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addAnOrder: async (req, res) => {
    try {
      const { order, user } = req.body;
      const newOrder = await new Orders(order);
      newOrder.save(async (err, result) => {
        if (!err) {
          const { cart, payed, orders } = await Users.findByIdAndUpdate(
            user._id,
            {
              cart: [],
              payed: user.payed + order.total,
              orders: [result._id, ...user.orders],
            },
            { new: true }
          );
          await Books.bulkWrite(
            order.books.map((book) => ({
              updateOne: {
                filter: { _id: book._id },
                update: {
                  $inc: {
                    sales: book.inCart,
                    quantity: -book.inCart,
                  },
                },
              },
            }))
          );
          return res.json({ newCart: cart, payed, orders, result });
        }
      });
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  makePayment: async (req, res) => {
    try {
      const { id, amount } = req.body;
      await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Kafka",
        payment_method: id,
        confirm: true,
      });
      return res.json({ success: true, msg: "Payment Successful" });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { REFRESH_TOKEN } = req.cookies;
      if (!REFRESH_TOKEN) return res.json({ msg: "Login or register" });
      jwt.verify(
        REFRESH_TOKEN,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.json({ msg: "Login or register" });
          const _ACCESS_TOKEN = createAccessToken({ id: user.id });
          return res.status(200).json({ _ACCESS_TOKEN });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPublicInfo: async (req, res) => {
    try {
      const { username } = await req.body;
      const { _id, read, currently_reading, to_read } = await Users.findOne({
        username,
      }).populate({
        path: "read currently_reading to_read",
        select: "genres",
      });
      const genres = getUserInterests({ read, currently_reading, to_read });
      const info = await Users.findByIdAndUpdate(_id, { genres }, { new: true })
        .select("-password -cart -favoris -notifications -payed -orders")
        .populate([
          {
            path: "read currently_reading to_read",
            select: "name rating price genres",
          },
          { path: "highlights", select: "name picture username" },
        ]);
      const reviews = await Reviews.find({ owner: _id })
        .populate({ path: "book_id", select: "name cover" })
        .sort("-createdAt")
        .select("-createdAt -updatedAt");
      if (!info) return res.json(null);
      return res.status(200).json({
        info,
        reviews: reviews.filter((review) => review.book_id !== null),
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUserAccount: async (req, res) => {
    try {
      const { id } = req.user;
      const {
        first_name,
        last_name,
        username,
        email,
        old_password,
        new_password,
      } = req.body;
      const _user = await Users.findOne({ _id: id });
      let updatedUser = {},
        newInfo = {};
      if (old_password && new_password) {
        const passwordMatch = await bcrypt.compare(
          old_password,
          _user.password
        );
        if (passwordMatch) {
          const newPasswordHash = await bcrypt.hash(new_password, saltRounds);
          newInfo = {
            name: first_name + " " + last_name,
            username,
            email,
            password: newPasswordHash,
          };
        } else
          return res.json({ msg: "Your password is incorrect. Try again" });
      } else {
        newInfo = {
          name: first_name + " " + last_name,
          username,
          email,
        };
      }
      updatedUser = await Users.findByIdAndUpdate(id, newInfo, {
        new: true,
      }).select("name password email");
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const { id } = req.user;
      const { password } = req.body;
      const { password: correctPassword } = await Users.findOne({ _id: id });
      const passwordMatch = await bcrypt.compare(password, correctPassword);
      if (passwordMatch) {
        const user = await Users.findByIdAndUpdate(id, { active: false });
        return res.status(200).json({
          msg:
            user.name +
            " Your account has been deleted permanently, we hope to meet you again",
          deleted: true,
        });
      } else {
        return res
          .status(200)
          .json({ msg: "Password is incorrect, try again !", deleted: false });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateReadingList: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await Users.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      }).select("read to_read currently_reading");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  userSendMail: async (req, res) => {
    try {
      const { values } = req.body;
      const mail = new Mails(values);
      mail.save();
      return res.status(200).json(mail);
    } catch (error) {
      return res.status(200).json({ msg: error.message });
    }
  },
  sentResetPasswordLink: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(200).json({
          valid: false,
          msg: "There is no user registred with this email.",
        });
      }

      const token = jwt.sign({ userId: user._id }, user.password, {
        expiresIn: 3600,
      });
      const link = `http://${process.env.CLIENT_HOST}/change-password/${user._id}/${token}`;
      const msg = {
        from: "Kafka <bassiri.bilal@gmail.com>",
        to: email,
        subject: "Reset your password",
        html: `<h3>You are receiving this because you (or someone else) have requested the reset of the password for your account.</h3>
         Please click on the following link to complete the process:<br/> <a href=${link}>
         ${link}</a><br/>
         <br/><em>NB: If you did not request this, please ignore this email and your password will remain unchanged.</em>`,
      };
      await sgMail.send(msg);
      return res.status(200).json({ valid: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  receiveNewPassword: async (req, res) => {
    try {
      const { userId, token } = req.params;
      const { password } = req.body;
      const user = await Users.findById(userId);
      if (!user) return res.status(200).json({ valid: false });
      const payload = jwt.decode(token, user.password);
      if (payload.userId == user._id) {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const upd = await Users.findByIdAndUpdate(userId, {
          password: passwordHash,
        });
        if (!upd) {
          return res.status(500).json({ msg: error.message });
        } else return res.status(200).json({ valid: true });
      } else return res.status(500).json({ msg: error.message });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const createAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
const createRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
module.exports = controllers;
