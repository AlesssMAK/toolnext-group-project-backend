import Category from "../models/category.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { title, description, keywords } = req.body;

    if (!title || !description || !keywords) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCategory = new Category({ title, description, keywords });
    await newCategory.save();

    res.status(201).json({
      status: "success",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};


