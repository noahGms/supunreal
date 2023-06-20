const commentMapper = (comment) => ({
  id: comment._id,
  content: comment.content,
  post: comment.post,
  user: comment.user,
  created_at: comment.createdAt,
  updated_at: comment.updatedAt
});

export {commentMapper};