const router = require('express').Router();
const controllers = require('../controllers/book');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/book')
    .get(controllers.getBooks)
    .post(auth, authAdmin, controllers.addBook)
    .delete(auth, authAdmin, controllers.deleteBook)
    .put(auth, controllers.updateBook)
router.route('/book/rate')
    .post(auth, controllers.updateRating)
router.route('/book/:id')
    .get(controllers.getBookDetail)
router.route('/book/categories/:name')
    .post(controllers.getBooksCategory)
module.exports = router