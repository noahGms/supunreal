import {Router} from 'express';
import {isAuth} from "../middleware/auth.js";
import {create, destroy, findAll, findOne} from "../controller/conversation.js";
import {createMessage, destroyMessage, findAllMessagesForConversation, updateMessage} from "../controller/message.js";

const conversationRouter = Router();

conversationRouter.get('/', isAuth, findAll);
conversationRouter.get('/:id', isAuth, findOne);
conversationRouter.post('/:userId', isAuth, create);
conversationRouter.delete('/:id', isAuth, destroy);


conversationRouter.get('/:id/messages', isAuth, findAllMessagesForConversation);
conversationRouter.post('/:id/messages', isAuth, createMessage);
conversationRouter.put('/:id/messages/:messageId', isAuth, updateMessage);
conversationRouter.delete('/:id/messages/:messageId', isAuth, destroyMessage);

export default conversationRouter;