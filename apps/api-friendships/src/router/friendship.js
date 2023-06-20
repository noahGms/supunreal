import {Router} from 'express';
import {isAuth} from "../middleware/auth.js";
import {
  approve,
  create,
  deny,
  findAll,
  destroy,
  findAllInvitations,
  findAllRequests
} from "../controller/friendship.js";

const friendshipRouter = Router();

friendshipRouter.get('/', isAuth, findAll);
friendshipRouter.get('/invitations', isAuth, findAllInvitations);
friendshipRouter.get('/requests', isAuth, findAllRequests);

friendshipRouter.post('/:userId', isAuth, create);

friendshipRouter.post('/:id/approve', isAuth, approve);
friendshipRouter.post('/:id/deny', isAuth, deny);

friendshipRouter.delete('/:id', isAuth, destroy);

export default friendshipRouter;