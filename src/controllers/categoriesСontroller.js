const Category = require("../models/category.model");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.json({
      status: "success",
      code: 200,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
