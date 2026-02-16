import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, owner: req.user });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find({ owner: req.user });
  res.json(products);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, owner: req.user },
    req.body,
    { new: true }
  );
  if (!product) return res.status(404).json({ error: "No encontrado" });
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user });
  if (!product) return res.status(404).json({ error: "No encontrado" });
  res.json({ message: "Eliminado" });
};
