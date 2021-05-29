const router = require("express").Router();
const controllers = require("../controllers/admin");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/all", auth, authAdmin, controllers.getAllUsersReviews);
module.exports = router;
