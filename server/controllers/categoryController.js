const Category = require('../models/Category');
const { Op } = require('sequelize'); 

exports.getCategories = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'A userId query parameter is required.' });
        }

        const categories = await Category.findAll({
            where: {
                [Op.or]: [
                    { userId: null },           
                    { userId: userId }          
                ]
            }
        });

        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, userId } = req.body;
        if (!name || !userId) {
            return res.status(400).json({ error: 'Both name and userId are required.' });
        }

        const category = await Category.create({ name, userId });
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ error: 'A userId query parameter is required to verify ownership.' });
        }

        const category = await Category.findOne({ where: { id: categoryId } });

        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }
        if (category.userId !== parseInt(userId)) {
             return res.status(403).json({ error: 'You do not have permission to delete this category.' });
        }

        await category.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};