import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createMarketplace,
  deleteMarketplaceItem,
  getAllMarketplaceItems,
  getOneMarketplaceItem,
  updateMarketplaceItem,
} from "../controllers/marketPlaceController.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.get("/", isAuth, getAllMarketplaceItems);
router.get("/:id", isAuth, getOneMarketplaceItem);
router.post("/", isAuth, createMarketplace);
router.put("/:id", isAuth, uploadFile, updateMarketplaceItem);
router.delete("/:id", isAuth, deleteMarketplaceItem);

export default router;
