import {User} from "@supunreal/database";
import jwt from "jsonwebtoken";
import {loginSchema, registerSchema} from "@supunreal/validation";
import userMapper from "../mapper/user.js";

export async function register(req, res) {
  const body = req.body;

  try {
    const value = await registerSchema.validateAsync(body);

    const usernameAlreadyExist = await User.findOne({username: value.username});
    const emailAlreadyExist = await User.findOne({email: value.email});

    if (usernameAlreadyExist) throw new Error('Username already exist !');
    if (emailAlreadyExist) throw new Error('Email already exist !');

    await User.create(value);

    return res.status(201).json({message: 'Register success !'});
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
}

export async function login(req, res) {
  const body = req.body;

  try {
    const value = await loginSchema.validateAsync(body);
    const user = await User.findOne({email: value.email});

    if (!user || !await user.comparePassword(value.password)) {
      throw new Error('Bad email or password !');
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.cookie('token_bearer', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      message: 'Login success !',
      token_bearer: token,
    });
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
}

export async function whoami(req, res) {
  const user = await User.findById(req.user.id);
  return res.status(200).json({
    data: userMapper(user)
  });
}
