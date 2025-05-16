import { MarketplaceItem } from "../models/marketPlaceItem.js";
import TryCatch from "../utils/Trycatch.js";
import getDataUrl from "../utils/urlGenrator.js";
import cloudinary from "cloudinary";

export const createMarketplace = TryCatch(async (req, res) => {
  // const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content, option);
  const marketplaceItem = await MarketplaceItem.create({ ...req.body });

  res.status(201).json({
    message: "MarketplaceItem created",
    marketplaceItem,
  });
});

export const deleteMarketplaceItem = TryCatch(async (req, res) => {
  const marketplaceItem = await MarketplaceItem.findById(req.params.id);

  if (!marketplaceItem)
    return res.status(404).json({
      message: "No MarketplaceItem with this id",
    });

  if (marketplaceItem.createdBy.toString() !== req.user._id.toString())
    return res.status(403).json({
      message: "Unauthorized",
    });

  await cloudinary.v2.uploader.destroy(post.post.id);
  await marketplaceItem.deleteOne();
  res.json({
    message: "MarketplaceItem Deleted",
  });
});

export const getAllMarketplaceItems = TryCatch(async (req, res) => {
  const marketPlaceItems = await MarketplaceItem.find()
    .sort({ createdAt: -1 })
    .populate("createdBy", "-password");

  res.json({ marketPlaceItems });
});

export const getOneMarketplaceItem = TryCatch(async (req, res) => {
  const post = await MarketplaceItem.findOne({ _id: req.params.id })
    .populate("owner", "-password")
    .populate({
      path: "comments.user",
      select: "-password",
    });
  res.json({ result: post });
});

export const updateMarketplaceItem = TryCatch(async (req, res) => {
  const marketplaceItem = await MarketplaceItem.findById(req.params.id);
  const { title, description } = req.body;
  if (!marketplaceItem)
    return res.status(404).json({
      message: "No MarketplaceItem with this id",
    });

  marketplaceItem.title = title;
  marketplaceItem.description = description;
  marketplaceItem.date = date;
  marketplaceItem.location = location;
  // coverImage pending
  await marketplaceItem.save();

  res.json({
    message: "MarketplaceItem Updated",
  });
});
