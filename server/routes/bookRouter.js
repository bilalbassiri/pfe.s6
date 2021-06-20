const router = require("express").Router();
const controllers = require("../controllers/book");
const auth = require("../middleware/auth");

router
  .route("/book")
  .get(controllers.getBooks)
  .put(auth, controllers.updateBook);
router.route("/book/search").post(controllers.getSearchBooks);
router.route("/book/rate").post(auth, controllers.updateRating);
router.route("/book/:id").get(controllers.getBookDetail);
router.route("/book/categories/:name").post(controllers.getBooksCategory);
module.exports = router;
