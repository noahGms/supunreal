import mongoose from "mongoose";

export {User} from './models/user.js';
export {Post} from './models/post.js';
export {File} from './models/file.js';
export {Comment} from './models/comment.js';
export {Friendship} from './models/friendship.js';

export async function setupDatabase(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
    });

    console.log('Database connected !');
  } catch (error) {
    console.log('Database connection error !');
    console.log(error);

    throw error;
  }
}