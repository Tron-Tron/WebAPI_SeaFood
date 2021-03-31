const express = require("express");
const { authorize } = require("../../middleware/authorize");
const { jwtAuth } = require("../../middleware/jwtAuth");
const categoryController = require("../../controllers/categoryController");
const router = express.Router();

//router.use(jwtAuth, authorize("admin"));
router
  .route("/")
  .post(categoryController.createNewCategory)
  .get(categoryController.getAllCategory);

router.delete("/:idCategory", categoryController.deleteCategoryById);

router.patch("/:idCategory", categoryController.updateCategoryById);
module.exports = router;
