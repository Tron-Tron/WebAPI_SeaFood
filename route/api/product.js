const express = require("express");
const productController = require("../../controllers/productController");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const upload = require("../../middleware/upload");
const router = express.Router();

router
  .route("/")
  .get(jwtAuth, productController.getAllProducts)
  //  .post(productController.createNewProduct);
  .post(upload.single("image"), productController.createNewProduct);

router
  .route("/:idProduct")
  .get(productController.getProductById)
  .delete(productController.deleteProductById)
  .patch(productController.updateProductById);
module.exports = router;
