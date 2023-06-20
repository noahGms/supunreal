import {conversationMapper} from "./conversation.js";
import {userMapper} from "./user.js";

const messageMapper = (message) => ({
  id: message._id,
  conversation: conversationMapper(message.conversation),
  user: userMapper(message.user),
  content: message.content,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt,
});

export {messageMapper};