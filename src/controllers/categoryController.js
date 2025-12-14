// controllers/categoriesController.js
import Category from "../models/category.js";

// Отримати всі категорії
export const getAllCategories = async (req, res, next) => {
  try {
    // Вибираємо тільки поле name і сортуємо за алфавітом
    const categories = await Category.find({}, "name").sort({ name: 1 });

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    // Передаємо помилку в middleware для обробки
    next(error);
  }
};
