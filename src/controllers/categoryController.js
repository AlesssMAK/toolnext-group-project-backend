import Category from "../models/category.js";

// Отримати всі категорії (лише title)
export const getAllCategories = async (req, res, next) => {
  try {
    // Вибираємо тільки поле title
    const categories = await Category.find().select("title");

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};



