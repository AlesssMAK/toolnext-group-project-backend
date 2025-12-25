import Category from '../models/category.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const categoriesList = await Category.find().select('title');

    res.status(200).json({
      status: 'success',
      data: categoriesList,
    });
  } catch (error) {
    next(error);
  }
};



