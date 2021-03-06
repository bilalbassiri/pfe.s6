const router = require("express").Router();
const adminControllers = require("../controllers/admin");
const controllers = require("../controllers/book");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/all").get(auth, authAdmin, adminControllers.getAllData);
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
router.route("/mails").post(auth, authAdmin, adminControllers.readMessage);
router.route("/users").delete(auth, authAdmin, adminControllers.deleteUser);

module.exports = router;
