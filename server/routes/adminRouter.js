const router = require("express").Router();
const adminControllers = require("../controllers/admin");
const controllers = require("../controllers/book");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/all").get(auth, authAdmin, adminControllers.getAllUsersReviews);
router
  .route("/books")
  .post(auth, authAdmin, controllers.addBook)
  .delete(auth, authAdmin, controllers.deleteBook)
  .put(auth, authAdmin, controllers.updateBook);
router.route("/users").put(auth, authAdmin, adminControllers.setUsersActive);
router
  .route("/orders")
  .post(auth, authAdmin, adminControllers.deliverOrder)
  .delete(auth, authAdmin, adminControllers.deleteOrder);
router
  .route("/reviews")
  .delete(auth, authAdmin, adminControllers.deleteAllReviews);
module.exports = router;
