
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { User } from "../models/User.js";


export const registerUser = async (req, res, next) => {
  const { email, password} = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, 'Email in use'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json(newUser);
};
