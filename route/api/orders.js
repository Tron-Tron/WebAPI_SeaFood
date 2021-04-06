const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const orderController = require("../../controllers/orderController");
const router = express.Router();

//router.use(jwtAuth, authorize("admin"));
router.get("/", orderController.getAllOrders);
router.get("/:idOrder", orderController.getOrderById);

router.delete("/:idOrder", orderController.deleteCategoryById);

router.patch("/:idOrder", orderController.updateCategoryById);
module.exports = router;
