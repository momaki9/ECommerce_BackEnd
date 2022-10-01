const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
 // find all categories and includes its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one category by its `id` value and includes its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryId) {
      res.status(404).json({ message: "No category found with the given id"});
      return;
    }
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err)
  }
});
// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err)
  }
});
// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(updateCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryEntry = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryEntry) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;