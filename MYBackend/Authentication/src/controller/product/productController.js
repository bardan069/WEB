import { Product } from '../../models/product/Product.js';

// Fetch all products
const getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send({ data: products, message: 'Successfully fetched products' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Fetch product by id
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(404).send({ message: 'Product not found' });
    res.status(200).send({ data: product, message: 'Product fetched successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create new product
const create = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || !price) return res.status(400).send({ message: 'Name and price are required' });
    const product = await Product.create({ name, price, description, image });
    res.status(201).send({ data: product, message: 'Product created successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update product
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image } = req.body;
    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(404).send({ message: 'Product not found' });
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.image = image ?? product.image;
    await product.save();
    res.status(200).send({ data: product, message: 'Product updated successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete product
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) return res.status(404).send({ message: 'Product not found' });
    await product.destroy();
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

export const productController = {
  getAll,
  getById,
  create,
  update,
  deleteById,
}; 