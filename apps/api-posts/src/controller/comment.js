import {Post, Comment} from "@supunreal/database";
import {createAndUpdateCommentSchema} from "@supunreal/validation";
import {commentMapper} from "@supunreal/mapper";

export async function findAllCommentsForPost(req, res) {
  const {id} = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found !',
      });
    }

    const comments = await Comment.find({
      post: post._id,
    });

    return res.status(200).json({
      data: comments.map(comment => commentMapper(comment)),
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function createComment(req, res) {
  const {id} = req.params;
  const body = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found !',
      });
    }

    const value = await createAndUpdateCommentSchema.validateAsync(body);

    await Comment.create({
      ...value,
      post: post._id,
      user: req.user.id,
    });

    return res.status(201).json({
      message: 'Comment created !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function updateComment(req, res) {
  const {id, commentId} = req.params;
  const body = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found !',
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        error: 'Comment not found !',
      });
    }

    if (comment.post.toString() !== post._id.toString()) {
      return res.status(404).json({
        error: 'Comment not found !',
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        error: 'You are not allowed to update this comment !',
      });
    }

    const value = await createAndUpdateCommentSchema.validateAsync(body);

    await Comment.updateOne({
      _id: comment._id,
    }, {
      $set: value,
    });

    return res.status(200).json({
      message: 'Comment updated !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

export async function destroyComment(req, res) {
  const {id, commentId} = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found !',
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        error: 'Comment not found !',
      });
    }

    if (comment.post.toString() !== post._id.toString()) {
      return res.status(404).json({
        error: 'Comment not found !',
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        error: 'You are not allowed to delete this comment !',
      });
    }

    await Comment.deleteOne({
      _id: comment._id,
    });

    return res.status(200).json({
      message: 'Comment deleted !',
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}