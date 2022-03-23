const productDao = require("../models/productDao");

const sendCategories = async () => {
  try {
    const categories = await productDao.getCategoryList();
    return categories;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendProducts = async () => {
  try {
    const products = await productDao.getProductList();
    return products;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendDetail = async () => {
  try {
    const details = await productDao.getDetail();
    return details;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { sendCategories, sendProducts, sendDetail };
