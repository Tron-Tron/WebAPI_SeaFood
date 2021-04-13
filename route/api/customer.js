const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const customerController = require("../../controllers/customerController");
const upload = require("../../middleware/upload");
const router = express.Router();

router.use(jwtAuth, authorize("admin"));
router
  .route("/")
  .post(
    jwtAuth,
    authorize("admin"),
    upload.single("image"),
    customerController.createNewCustomer
  )
  .get(customerController.getAllCustomers);

router.delete("/:id", customerController.deleteCustomerById);

router.patch(
  "/:id",
  upload.single("image"),
  customerController.updateCustomerById
);
module.exports = router;
