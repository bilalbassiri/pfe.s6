import axios from "axios";

const getReviewsFromDB = async (id) => {
  try {
    const { data: reviews } = await axios.get(`/api/book/${id}/reviews`);
    return reviews;
  } catch (err) {
    console.log(err.message);
  }
};
const getBooksFromDB = async () => {
  try {
    const { data: books } = await axios.get("/api/book");
    return books;
  } catch (err) {
    console.log(err.message);
  }
};
const getBookDetailFromDB = async (id) => {
  try {
    const { data: book } = await axios.get(`/api/book/${id}`, { body: { id } });
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
      url: "/user/refresh_token",
    });
    const { data } = await axios({
      method: "get",
      url: "/user/info",
      headers: {
        authorization: _ACCESS_TOKEN,
      },
    });
    return { data, _ACCESS_TOKEN };
  } catch (err) {
    console.log(err.message);
  }
};
const getUserProfile = async (_id) => {
  try {
    const { data } = await axios({
      method: "post",
      url: "/user/profile",
      data: {
        _id,
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
      url: "/api/book/review/upvote",
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
      url: "/api/book/review",
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
      url: "/api/book/review",
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
      url: "/user/cart",
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
      url: "/user/favoris",
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
    const order = { user, books, total };
    const { data } = await axios({
      method: "post",
      url: "/user/order",
      headers: {
        authorization: token,
      },
      data: {
        order,
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
      url: "/api/upload",
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
      url: "/user/update",
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
      url: "/user/highlight",
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
      url: "/api/book/categories/" + categorie,
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
      url: "/user/account",
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
      url: "/user/delete",
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
      url: "/user/reading",
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
      url: "/user/notifications",
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
      url: "/admin/all",
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
      url: "/admin/books",
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
      url: "/admin/users",
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
      url: "/admin/books",
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
  adminUpdateBook
};
