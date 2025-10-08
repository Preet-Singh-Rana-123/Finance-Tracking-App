const express = require("express");
const categoryController = require("../controllers/categoryController");
const {authenticateToken} = require("../middleware/authMiddleware");

const categoryRouter = express.Router();

categoryRouter.post("/", authenticateToken, categoryController.postCategory);
categoryRouter.get("/", authenticateToken, categoryController.getCategory);
categoryRouter.put("/:id", authenticateToken, categoryController.updateCategory);
categoryRouter.delete("/:id", authenticateToken, categoryController.deleteCategory);

module.exports = categoryRouter;
