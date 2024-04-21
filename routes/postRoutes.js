import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.post("/create-post", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
