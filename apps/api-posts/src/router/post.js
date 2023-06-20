import {Router} from 'express';
import {isAuth} from "../middleware/auth.js";
import {upload} from "../config/storage.js";
import {destroy, findAll, findOne, update, create} from "../controller/post.js";
import {findAllCommentsForPost, createComment, updateComment, destroyComment} from "../controller/comment.js";

const postRouter = Router();

postRouter.get('/', isAuth, findAll);
postRouter.get('/:id', isAuth, findOne);
postRouter.post('/', [isAuth, upload.single('file')], create);
postRouter.put('/:id', isAuth, update);
postRouter.delete('/:id', isAuth, destroy);

postRouter.get('/:id/comments', isAuth, findAllCommentsForPost);
postRouter.post('/:id/comments', isAuth, createComment);
postRouter.put('/:id/comments/:commentId', isAuth, updateComment);
postRouter.delete('/:id/comments/:commentId', isAuth, destroyComment);

export default postRouter;