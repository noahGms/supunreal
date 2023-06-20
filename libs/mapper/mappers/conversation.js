import {userMapper} from "./user.js";

const conversationMapper = (conversation) => ({
  id: conversation.id,
  user1: userMapper(conversation.user1),
  user2: userMapper(conversation.user2),
  createdAt: conversation.createdAt,
  updatedAt: conversation.updatedAt,
});

export {conversationMapper};