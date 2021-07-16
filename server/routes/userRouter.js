const router = require("express").Router();
const controllers = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get("/logout", controllers.logout);
router.get("/info", auth, controllers.getUser);
router.get("/refresh_token", controllers.refreshToken);
router.post("/cart", auth, controllers.updateCart);
router.post("/favoris", auth, controllers.updateFavoris);
router.post("/order", auth, controllers.addAnOrder);
router.post("/payment", controllers.makePayment);
router.post("/profile", controllers.getPublicInfo);
router.post("/update", auth, controllers.updateUserInfo);
router.post("/highlight", auth, controllers.highlightReader);
router.post("/account", auth, controllers.updateUserAccount);
router.delete("/delete", auth, controllers.deleteAccount);
router.post("/reading", auth, controllers.updateReadingList);
router.post("/notifications", auth, controllers.updateNotifications);
router.post("/contact", controllers.userSendMail);
router.post("/reset-password", controllers.sentResetPasswordLink);
router.post("/change-password/:userId/:token", controllers.receiveNewPassword);

module.exports = router;
