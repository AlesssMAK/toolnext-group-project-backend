
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { createSession, setSessionCookies  } from "../services/auth.js";
import { User } from "../models/user.js";

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
