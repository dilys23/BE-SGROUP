const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);




module.exports = router;
