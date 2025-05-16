import mongoose from "mongoose";

const marketplaceItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "others",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      id: String,
      url: String,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    location: String,
  },
  {
    timestamps: true,
  }
);

export const MarketplaceItem = mongoose.model("MarketplaceItem", marketplaceItemSchema);
