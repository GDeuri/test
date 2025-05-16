import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  commentonPost,
  deleteComment,
  deletePost,
  deleteReply,
  editCaption,
  getAllPosts,
  getOnePost,
  likeUnlikePost,
  newPost,
  replyOnComment,
} from "../controllers/postControllers.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", isAuth, uploadFile, newPost);

router.put("/:id", isAuth, editCaption);
router.delete("/:id", isAuth, deletePost);

router.get("/all", isAuth, getAllPosts);
router.get("/:id", isAuth, getOnePost);

router.post("/like/:id", isAuth, likeUnlikePost);

router.post("/comment/:id", isAuth, commentonPost);
router.post("/reply", isAuth, replyOnComment);
router.delete("/reply/:id", isAuth, deleteReply);
router.delete("/comment/:id", isAuth, deleteComment);

export default router;
