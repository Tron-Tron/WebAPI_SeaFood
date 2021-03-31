const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const userController = require("../../controllers/userController");
const router = express.Router();

router.get("/all", jwtAuth, authorize("admin"), userController.getAllUsers);
router.get("/:userId", jwtAuth, authorize("admin"), userController.getUserById);
router.delete(
  "/:userId",
  jwtAuth,
  authorize("admin"),
  userController.deleteUserById
);
router.patch("/:userId", jwtAuth, userController.updateUserById);

module.exports = router;
//put: -> thay the record cu bang record moi
//patch: -> update field trong record
