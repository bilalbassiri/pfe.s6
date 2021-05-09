const router = require('express').Router();
const uploadImage = require('../controllers/upload');
const auth = require('../middleware/auth');

router.post('/upload', auth, uploadImage);

module.exports = router;