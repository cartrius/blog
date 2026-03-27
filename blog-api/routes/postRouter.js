const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { verifyToken, verifyAuthor } = require("../middleware/auth");

router.get("/", postController.getAllPosts);
router.get("/all", verifyToken, verifyAuthor, postController.getAllPostsAdmin);
router.get("/:id", postController.getPost);

router.post("/", verifyToken, verifyAuthor, postController.createPost);
router.put("/:id", verifyToken, verifyAuthor, postController.updatePost);
router.delete("/:id", verifyToken, verifyAuthor, postController.deletePost);

module.exports = router;