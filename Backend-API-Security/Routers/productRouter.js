const express = require('express');
const { authenticate, adminProtected } = require('../middleware/auth');
const { getOneProduct, getAllProducts, createProduct, deleteProduct, updateProduct } = require('../handlers/productHandler');
const validateFields = require('../middleware/validator');

const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

router.post('/', authenticate, adminProtected, validateFields, async(req, res) => {
  try {
    await createProduct(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.get('/:id', async(req, res) => {
  try {
    const product = await getOneProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

router.delete('/:id', authenticate, adminProtected, async(req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

router.put('/:id', authenticate, adminProtected, validateFields, async(req, res) => {
  try {
    await updateProduct(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

module.exports = router;
