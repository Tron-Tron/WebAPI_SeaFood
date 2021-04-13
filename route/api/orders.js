const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const orderController = require("../../controllers/orderController");
const router = express.Router();

//router.use(jwtAuth, authorize("admin"));
router.post("/", orderController.createNewOrder);
router.get("/", jwtAuth, authorize("admin"), orderController.getAllOrders);
router.get("/:id", jwtAuth, authorize("admin"), orderController.getOrderById);

router.delete(
  "/:id",
  jwtAuth,
  authorize("admin"),
  orderController.deleteOrderById
);

router.patch(
  "/:idOrder",
  jwtAuth,
  authorize("admin"),
  orderController.updateOrderById
);
module.exports = router;
