import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
} from "../controllers/eventController.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.get("/", isAuth, getAllEvents);
router.get("/:id", isAuth, getOneEvent);
router.post("/", isAuth, uploadFile, createEvent);
router.put("/:id", isAuth, uploadFile, updateEvent);
router.delete("/:id", isAuth, deleteEvent);

export default router;
