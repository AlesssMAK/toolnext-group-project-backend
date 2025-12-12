
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { createSession, setSessionCookies  } from "../services/auth.js";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password} = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, 'Email in use'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

   const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json({
    user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      }
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // const user = await User.findOne({
  //   $or: [{email}, {name}]
  // });
  // if (!user) {
  //   return next(createHttpError(401, 'Invalid email or name'));
  // }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(401, 'Invalid email'));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(createHttpError(401, 'Invalid password'));
  }

  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    }
  });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  };

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

   res.status(200).json({
    success: true,
    message: "Ви вийшли із профілю",
  });
};
