const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const staffController = require("../../controllers/staffController");
const upload = require("../../middleware/upload");
const router = express.Router();

router
  .route("/")
  .post(
    jwtAuth,
    authorize("owner"),
    upload.single("p_image"),
    staffController.createNewStaff
  )
  .get(staffController.getAllStaffs);

router.delete(
  "/:id",
  jwtAuth,
  authorize("owner"),
  staffController.deleteStaffById
);

router.patch(
  "/:id",
  upload.single("image"),
  staffController.updateEmployeeById
);
module.exports = router;
