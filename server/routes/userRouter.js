const router = require('express').Router();
const controllers = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/logout', controllers.logout);
router.get('/info', auth, controllers.getUser);
router.get('/refresh_token', controllers.refreshToken);
router.post('/cart', auth, controllers.updateCart);
router.post('/favoris', auth, controllers.updateFavoris);

module.exports = router