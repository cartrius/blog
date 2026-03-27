const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { verifyToken } = require("../middleware/auth");

router.get("/post:id", commentController.getComments);
router.post("/post/:postId", verifyToken, commentController.createComment);
router.delete("/:id", verifyToken, commentController.deleteComment);

module.exports = router;