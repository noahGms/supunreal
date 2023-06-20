import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema({
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    requestAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {timestamps: true}
);

const Friendship = mongoose.model('Friendship', friendshipSchema);

export {Friendship};
