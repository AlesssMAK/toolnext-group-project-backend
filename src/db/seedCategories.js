const Category = require("../models/category.model");

exports.seedCategories = async () => {
  const defaultCategories = [
    { name: "Електроінструменти" },
    { name: "Будівельні інструменти" },
    { name: "Садові інструменти" },
    { name: "Автомобільні інструменти" }
  ];

  const count = await Category.countDocuments();

  if (count === 0) {
    await Category.insertMany(defaultCategories);
    console.log("Default categories added");
  }
};
