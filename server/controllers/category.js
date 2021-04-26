const Categories = require('../models/Category');
const controllers = {
    getCategories: async (req, res) => {
        try {
            const categories = await Categories.find().sort('-createdAt')
            res.json(categories)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await Categories.findOne({ name })
            if (category) return res.status(400).json({ msg: 'category already exist' })
            const newCategory = new Categories({ name })
            await newCategory.save()
            return res.json({ msg: 'Added 🍻' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { _id } = req.body;
            const deletedCategory = await Categories.findByIdAndDelete({ _id })
            return res.json(deletedCategory)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { _id, name } = req.body;
            const originalCategory = await Categories
            .findByIdAndUpdate(_id, {name})
            return res.json(originalCategory)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = controllers;