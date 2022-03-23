const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("", productController.sendProducts);
router.get("/categories", productController.sendCategories);
router.get("/details", productController.sendDetail);

module.exports = router;
