import { Event } from "../models/eventModel.js";
import { Post } from "../models/postModel.js";
import TryCatch from "../utils/Trycatch.js";
import getDataUrl from "../utils/urlGenrator.js";
import cloudinary from "cloudinary";

export const createEvent = TryCatch(async (req, res) => {
  // const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content, option);
  const file = req.file;
  const fileUrl = getDataUrl(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content, {});

  console.log(req.body, myCloud);
  const event = await Event.create({
    ...req.body,
    createdBy: req.user._id,
    coverImage: { id: myCloud.public_id, url: myCloud.secure_url },
  });

  res.status(201).json({
    message: "Event created",
    event,
  });
});

export const deleteEvent = TryCatch(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event)
    return res.status(404).json({
      message: "No event with this id",
    });

  if (event.createdBy.toString() !== req.user._id.toString())
    return res.status(403).json({
      message: "Unauthorized",
    });
  if (event.coverImage) {
    try {
      await cloudinary.v2.uploader.destroy(event.coverImage.id);
    } catch (err) {}
  }
  await event.deleteOne();
  res.json({
    message: "Event Deleted",
  });
});

export const getAllEvents = TryCatch(async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 }).populate("createdBy", "-password");

  res.json({ events });
});

export const getOneEvent = TryCatch(async (req, res) => {
  const post = await Event.findOne({ _id: req.params.id }).populate("owner", "-password").populate({
    path: "comments.user",
    select: "-password",
  });
  res.json({ result: post });
});

export const updateEvent = TryCatch(async (req, res) => {
  const event = await Event.findById(req.params.id);
  const { title, description } = req.body;
  if (!event)
    return res.status(404).json({
      message: "No event with this id",
    });

  event.title = title;
  event.description = description;
  event.date = date;
  event.location = location;
  // coverImage pending
  await event.save();

  res.json({
    message: "Event Updated",
  });
});
