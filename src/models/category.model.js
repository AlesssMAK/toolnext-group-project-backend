const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      minlength: 2,
      maxlength: 40,
      trim: true,
      unique: true
    }
  },
  { timestamps: true, versionKey: false }
);

const Category = model("Category", categorySchema);

module.exports = Category;
