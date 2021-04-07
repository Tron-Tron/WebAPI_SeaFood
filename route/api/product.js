const express = require("express");
const productController = require("../../controllers/productController");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const upload = require("../../middleware/upload");
const router = express.Router();

router
  .route("/")
  .get(jwtAuth, authorize("admin"), productController.getAllProducts)
  //  .post(productController.createNewProduct);
  .post(
    jwtAuth,
    authorize("admin"),
    upload.single("image"),
    productController.createNewProduct
  );

router
  .route("/:idProduct")
  .get(jwtAuth, authorize("admin"), productController.getProductById)
  .delete(jwtAuth, authorize("admin"), productController.deleteProductById)
  .patch(
    jwtAuth,
    authorize("admin"),
    upload.single("image"),
    productController.updateProductById
  );

module.exports = router;
