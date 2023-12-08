import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";
import { redisClient } from "../index.js";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

import express from "express";
const router = express.Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const { file, ...others } = req.body;

  const newProduct = new Product(others);
  if (file !== "DEFAULT_IMAGE") {
    try {
      cloudinary.uploader.upload(
        req.body.file,
        { public_id: others.image_id, folder: "products" },
        function (error, result) {
          if (error) {
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findOneAndRemove({ id: req.params.id });
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCTS
router.get("/find/:queryString", async (req, res) => {
  const arr = req.params.queryString.split(";");
  try {
    // const product = await Product.findOne({ id: req.params.id });
    const product = await Product.find({ id: { $in: arr } });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  
  const cached = await redisClient.get("products");

  if(cached) {
    console.log("Returned from cache");
    // console.log(cached)
    res.status(200).json(JSON.parse(cached));
    return;
  }

  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    //console.log(products);
    console.log("Not in cache");
    // console.log(products);
    await redisClient.set("products", JSON.stringify(products));
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
export default router;
