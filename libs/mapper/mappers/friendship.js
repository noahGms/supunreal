import {userMapper} from "./user.js";

const friendshipMapper = (friendship) => ({
  id: friendship._id,
  user1: userMapper(friendship.user1),
  user2: userMapper(friendship.user2),
  request_at: friendship.requestAt,
  approved_at: friendship.approvedAt,
  created_at: friendship.createdAt,
  updated_at: friendship.updatedAt,
});

export {friendshipMapper};