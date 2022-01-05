import axios from "axios";
const baseURL = "https://powerful-cove-30608.herokuapp.com";

const getReviewsFromDB = async (id) => {
  try {
    const { data: reviews } = await axios.get(
      `${baseURL}/api/book/${id}/reviews`
    );
    return reviews;
  } catch (err) {
    console.log(err.message);
  }
};
const getBooksFromDB = async () => {
  try {
    const { data: books } = await axios.get(`${baseURL}/api/book`);
    return books;
  } catch (err) {
    console.log(err.message);
  }
};
const getBookDetailFromDB = async (id) => {
  try {
    const { data: book } = await axios.get(`${baseURL}/api/book/${id}`, {
      body: { id },
    });
    return book;
  } catch (err) {
    console.log(err.message);
  }
};
const getAccessTokenAndUser = async () => {
  try {
    const {
      data: { _ACCESS_TOKEN },
    } = await axios({
      method: "get",
      url: `${baseURL}/user/refresh_token`,
    });
    const { data } = await axios({
      method: "get",
      url: `${baseURL}/user/info`,
      headers: {
        authorization: _ACCESS_TOKEN,
      },
    });
    return { data, _ACCESS_TOKEN };
  } catch (err) {
    console.log(err.message);
  }
};
const getUserProfile = async (username) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/user/profile`,
      data: {
        username,
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
const upvoteReview = async (_id, currentVotes) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/api/book/review/upvote`,
      data: {
        _id,
        currentVotes,
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
const addBookReview = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseURL}/api/book/review`,
      headers: {
        authorization: token,
      },
      data,
    });
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};
const deleteBookReview = async (_id, token) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${baseURL}/api/book/review`,
      headers: {
        authorization: token,
      },
      data: {
        _id,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};
const updateCart = async (books, token) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/user/cart`,
      headers: {
        authorization: token,
      },
      data: {
        cart: books,
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
const updateFavoris = async (books, token) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/user/favoris`,
      headers: {
        authorization: token,
      },
      data: {
        favoris: books,
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
const makeOrder = async (user, books, total, token) => {
  try {
    const order = { user: user._id, books, total };
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/user/order`,
      headers: {
        authorization: token,
      },
      data: {
        order,
        user,
      },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
const uploadImage = async (blobDataURL, token) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/api/upload`,
      data: {
        blobDataURL,
      },
      headers: {
        authorization: token,
      },
    });
    return data.url;
  } catch (err) {
    console.log(err.message);
  }
};
const updateUserInfo = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseURL}/user/update`,
      data,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
const updateUserHighlights = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseURL}/user/highlight`,
      data,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
const getCategory = async (categorie) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/api/book/categories/` + categorie,
    });
    return data.books;
  } catch (error) {
    console.log(error.message);
  }
};
const updateUserAccount = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseURL}/user/account`,
      data,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
const deleteAccount = async (password, token) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${baseURL}/user/delete`,
      data: {
        password,
      },
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
const updateReadingList = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseURL}/user/reading`,
      data,
      headers: { authorization: token },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
const sendNotifications = async (_id, notification, action, token) => {
  try {
    await axios({
      method: "post",
      url: `${baseURL}/user/notifications`,
      data: {
        _id,
        notification,
        action,
      },
      headers: { authorization: token },
    });
  } catch (err) {
    console.log(err.message);
  }
};
const getDashboardData = async (token) => {
  try {
    const { data } = await axios({
      method: "get",
      url: `${baseURL}/admin/all`,
      headers: { authorization: token },
    });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
const adminDeleteBooks = async (selectedBooks, token) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${baseURL}/admin/books`,
      data: {
        ids: selectedBooks,
      },
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminSetUsersActive = async (obj, token) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `${baseURL}/admin/users`,
      data: obj,
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminUpdateBook = async (obj, token) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `${baseURL}/admin/books`,
      data: obj,
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminAddNewBook = async (book, token) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/admin/books`,
      data: book,
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminUpdateDeliveringState = async (orderState, token) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/admin/orders`,
      data: orderState,
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminDeleteOrder = async (_id, token) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${baseURL}/admin/orders`,
      data: {
        _id,
      },
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminDeleteAllReviews = async (token) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${baseURL}/admin/reviews`,
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminReadMessage = async (mail_id, token) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/admin/mails`,
      data: { mail_id },
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const adminDeleteUsers = async (selectionModel, token) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `${baseURL}/admin/users`,
      data: { selectionModel },
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const searchABook = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/api/book/search`,
      data: values,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const userMakePayment = async (values, token) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/user/payment`,
      data: values,
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const sendResetPasswordMail = async (email) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/user/reset-password`,
      data: {
        email,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const changeOldPassword = async (userId, token, password) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseURL}/user/change-password/${userId}/${token}`,
      data: {
        password,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export {
  sendNotifications,
  getReviewsFromDB,
  getBooksFromDB,
  getAccessTokenAndUser,
  getBookDetailFromDB,
  upvoteReview,
  addBookReview,
  updateCart,
  updateFavoris,
  makeOrder,
  getUserProfile,
  uploadImage,
  updateUserInfo,
  updateUserHighlights,
  getCategory,
  updateUserAccount,
  deleteAccount,
  deleteBookReview,
  updateReadingList,
  getDashboardData,
  adminDeleteBooks,
  adminSetUsersActive,
  adminUpdateBook,
  adminAddNewBook,
  adminUpdateDeliveringState,
  adminDeleteOrder,
  adminDeleteAllReviews,
  adminReadMessage,
  adminDeleteUsers,
  searchABook,
  userMakePayment,
  sendResetPasswordMail,
  changeOldPassword,
};
