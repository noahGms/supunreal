import multer from 'multer';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const folder = './uploads/' + req.user.id;

    if (!await fs.existsSync(folder)) {
      await fs.mkdirSync(folder);
    }

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const uuid = uuidv4();
    
    cb(null, `${uuid}.${ext}`);
  }
});

export const upload = multer({storage: storage});