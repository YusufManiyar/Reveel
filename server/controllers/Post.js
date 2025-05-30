import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { createError } from "../error.js";

dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({success: true, posts});
  } catch (err) {
    next(createError(err.status, err?.response?.data?.message || err.message));
  }
}

export const createPost = async (req, res, next) => {
    try {

        const {author, prompt, photo} = req.body;
        // console.log("Creating post with data:", {author, prompt, photo});
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            author,
            prompt,
            photo: photoUrl?.secure_url
        });
        res.status(201).json({success: true, post: newPost});

    } catch (err) {
      console.log("Error creating post:", err);
        next(createError(err.status, err?.response?.data?.message || err.message));
    }
}