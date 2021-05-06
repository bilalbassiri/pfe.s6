import axios from 'axios';

const getReviewsFromDB = async id => {
    try {
        const { data: reviews } = await axios.get(`/api/book/${id}/reviews`);
        return reviews;
    } catch (err) {
        console.log(err.message)
    }
}
const getBooksFromDB = async () => {
    try {
        const { data: books } = await axios.get('/api/book')
        return books
    } catch (err) {
        console.log(err.message)
    }
}
const getBookDetailFromDB = async id => {
    try {
        const { data: book } = await axios.get(`/api/book/${id}`, { body: { id } })
        return book
    } catch (err) {
        console.log(err.message)
    }
}
const getAccessTokenAndUser = async () => {
    try {
        const { data: { _ACCESS_TOKEN } } = await axios({
            method: 'get',
            url: '/user/refresh_token',
        });
        const { data } = await axios({
            method: 'get',
            url: '/user/info',
            headers: {
                authorization: _ACCESS_TOKEN,
            }
        })
        return { data, _ACCESS_TOKEN }
    } catch (err) {
        console.log(err.message)
    }
}
const upvoteReview = async (_id, currentVotes) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: '/api/book/review/upvote',
            data: {
                _id,
                currentVotes
            }
        })
        return data
    } catch (err) {
        console.log(err.message)
    }
}
const addBookReview = async (data, token) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/api/book/review',
            headers: {
                authorization: token
            },
            data
        })
        return res.data
    } catch (err) {
        console.log(err.message)
    }
}
const updateCart = async (books, token) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: '/user/cart',
            headers: {
                authorization: token
            },
            data: {
                cart: books
            }
        })
        console.log(data)
        return data
    } catch (err) {
        console.log(err.message)
    }
}
const updateFavoris = async (books, token) => {
    try {
        const { data } = await axios({
            method: 'post',
            url: '/user/favoris',
            headers: {
                authorization: token
            },
            data: {
                favoris: books
            }
        })
        return data
    } catch (err) {
        console.log(err.message)
    }
}
export {
    getReviewsFromDB,
    getBooksFromDB,
    getAccessTokenAndUser,
    getBookDetailFromDB,
    upvoteReview,
    addBookReview,
    updateCart,
    updateFavoris
}