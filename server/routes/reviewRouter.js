const router = require('express').Router();
const controllers = require('../controllers/review');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/review')
    .post(auth, controllers.addReview)
    .put(auth, controllers.updateReview)
    .delete(auth, controllers.deleteReview)
router.route('/:bookId/reviews')
    .get(controllers.getReviews)
router.route('/review/upvote')
    .post(controllers.upvoteReview)

module.exports = router