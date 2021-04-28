const router = require('express').Router();
const controllers = require('../controllers/book');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/book')
    .get(controllers.getBooks)
    .post(auth, authAdmin, controllers.addBook)
    .delete(auth, authAdmin, controllers.deleteBook)
    .put(auth, controllers.updateBook)

module.exports = router