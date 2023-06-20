import {Router} from 'express';
import {isAuth} from "../middleware/auth.js";
import {destroy, findAll, findOne, update, create} from "../controller/post.js";
import {upload} from "../config/storage.js";

const postRouter = Router();

postRouter.get('/', isAuth, findAll);
postRouter.get('/:id', isAuth, findOne);
postRouter.post('/', [isAuth, upload.single('file')], create);
postRouter.put('/:id', isAuth, update);
postRouter.delete('/:id', isAuth, destroy);

export default postRouter;