import {Post, File} from "@supunreal/database";
import path from 'path';

export async function getFileForPost(req, res) {
  const {id, fileId} = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found !',
      });
    }

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({
        error: 'File not found !',
      });
    }
    
    return res.status(200).sendFile(
      path.join(path.resolve(), file.path)
    );
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}