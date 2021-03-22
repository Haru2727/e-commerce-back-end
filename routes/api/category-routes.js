const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
   // find all categories
    // included its associated Products
  try {
    const categoriesData = await Category.findAll(
      {
        include: {
          model: Product,
          // attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      }
    );
    // sending status with messages, data, or err.
    if (!categoriesData) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        // attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'This category does not exist' });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(er);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'Cannot update' });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'Did not delete properly, try again' });
      return;
    }
    res.status(200).json(categoriesData);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;