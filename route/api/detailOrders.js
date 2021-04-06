const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const detailOrderController = require("../../controllers/detailOrderController");
const router = express.Router();

//router.use(jwtAuth, authorize("admin"));
router.post("/", detailOrderController.createNewOrderDetail);
// router.get("/", orderDetailController.getAllOrders);
// router.get("/:idOrder", orderController.getOrderById);

// router.delete("/:idOrder", orderController.deleteCategoryById);

// router.patch("/:idOrder", orderController.updateCategoryById);
module.exports = router;
