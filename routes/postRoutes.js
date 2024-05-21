import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  commentPost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.post("/create-post", createPost);

router.get("/", getAllPosts);

router.get("/:userId/posts", getUserPosts);

/* UPDATE */
router.post("/:id/comment", commentPost);
router.patch("/:id/like", likePost);

export default router;
