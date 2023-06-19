const userMapper = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  is_admin: user.is_admin,
  created_at: user.createdAt,
  updated_at: user.updatedAt,
});

export default userMapper;