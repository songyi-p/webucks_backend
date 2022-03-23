const productService = require("../services/productService");

const sendCategories = async (req, res, next) => {
  try {
    const categories = await productService.sendCategories();
    return res.status(201).json({ categories });
  } catch (err) {
    console.log(err);
    next();
  }
};

const sendProducts = async (req, res, next) => {
  try {
    const products = await productService.sendProducts();
    return res.status(201).json({ products });
  } catch (err) {
    console.log(err);
    next();
  }
};

const sendDetail = async (req, res, next) => {
  try {
    const details = await productService.sendDetail();
    return res.status(201).json({ details });
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { sendCategories, sendProducts, sendDetail };
