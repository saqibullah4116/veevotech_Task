const express = require("express");
const { getAllProducts,creatProduct, updataProduct, deleteProduct, getSingleProduct} = require("../controllers/productController");

const router = express.Router();

//creating routes for product and passing callback function which is define in controller and logic is also there
router.route("/products").get(getAllProducts);
router.route("/product/new").post(creatProduct);
router.route("/product/:id").put(updataProduct);
// router.route("/product/:id").put(updataProduct).delete(deleteProduct).get(getSingleProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").get(getSingleProduct);


module.exports = router;
