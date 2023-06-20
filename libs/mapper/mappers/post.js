import {fileMapper} from "./file.js";
import {userMapper} from "./user.js";

const postMapper = (post) => ({
  id: post._id,
  title: post.title,
  description: post.description,
  location: post.location,
  ...(post.file ? {file: fileMapper(post.file)} : {file: post.file}),
  ...(post.user ? {user: userMapper(post.user)} : {user: post.user}),
  created_at: post.createdAt,
  updated_at: post.updatedAt,
});

export {postMapper};