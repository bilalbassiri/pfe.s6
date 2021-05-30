const router = require("express").Router();
const adminControllers = require("../controllers/admin");
const controllers = require("../controllers/book");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/all").get(auth, authAdmin, adminControllers.getAllUsersReviews);
router
  .route("/books")
  .post(auth, authAdmin, controllers.addBook)
  .delete(auth, authAdmin, controllers.deleteBook);
router.route("/users").put(auth, authAdmin, adminControllers.setUsersActive);
module.exports = router;
