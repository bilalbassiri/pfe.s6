const router = require('express').Router();
const controllers = require('../controllers/category');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/category')
.get(controllers.getCategories)
.post(auth, authAdmin, controllers.createCategory)
.delete(auth, authAdmin, controllers.deleteCategory)
.put(auth, authAdmin, controllers.updateCategory)

module.exports = router