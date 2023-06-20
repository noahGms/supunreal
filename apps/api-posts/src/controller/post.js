import {Post, File} from "@supunreal/database";
import {postMapper} from "@supunreal/mapper";
import {createPostSchema, updatePostSchema} from "@supunreal/validation";
import fs from "fs";
import axios from "axios";

const population = [
  {
    path: 'user',
  },
  {
    path: 'file',
  },
];

export async function findAll(req, res) {
  const posts = await Post.find().populate(population);

  return res.status(200).json({
    data: posts.map(post => postMapper(post)),
  });
}

export async function findOne(req, res) {
  const {id} = req.params;

  const post = await Post.findById(id).populate(population);

  if (!post) {
    return res.status(404).json({
      error: 'Post not found !',
    });
  }

  return res.status(200).json({
    data: postMapper(post),
  });
}

export async function create(req, res) {
  const body = req.body;

  try {
    const ip = req.ip;
    let latitude = 0;
    let longitude = 0;
    if (ip !== '::1') {
      const clientLocationResponse = await axios.get(`http://ip-api.com/json/${req.ip}`);
      latitude = clientLocationResponse.data.latitude;
      longitude = clientLocationResponse.data.longitude;
    }

    const value = await createPostSchema.validateAsync({
      ...body,
      file: req.file.path
    });

    const file = await File.create({
      originalName: req.file.originalname,
      name: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
    });
    delete value.file;

    await Post.create({
      ...value,
      location: `${latitude},${longitude}`,
      file: file.id,
      user: req.user.id,
    });

    return res.status(201).json({
      message: 'Post created !',
    });
  } catch (error) {
    await fs.unlinkSync(req.file.path);

    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function update(req, res) {
  const {id} = req.params;
  const body = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found !',
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        error: 'You are not allowed to update this post !',
      });
    }

    const value = await updatePostSchema.validateAsync(body);

    await Post.updateOne({
      _id: id,
    }, {
      $set: value,
    });

    return res.status(200).json({
      message: 'Post updated !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function destroy(req, res) {
  const {id} = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found !',
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        error: 'You are not allowed to update this post !',
      });
    }

    const fileId = post.file;
    await Post.deleteOne({
      _id: post._id,
    });

    if (fileId) {
      const file = await File.findById(fileId);

      await File.deleteOne({
        _id: file._id,
      });

      await fs.unlinkSync(file.path);
    }

    return res.status(200).json({
      message: 'Post deleted !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}