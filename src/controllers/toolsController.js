import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { Tool } from '../models/tool.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getTools = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    categories,
    search,
    minPrice,
    maxPrice,
  } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  const filters = {};
  if (categories) {
    const categoryIdsString = categories.split(',');
    const categoryObjectIds = categoryIdsString
      .map((id) => {
        if (mongoose.Types.ObjectId.isValid(id)) {
          return new mongoose.Types.ObjectId(id);
        }
        return null;
      })
      .filter((id) => id !== null);
    if (categoryObjectIds.length > 0) {
      filters.category = { $in: categoryObjectIds };
    } else if (categories.length > 0 && categoryObjectIds.length === 0) {
      filters.category = { $in: [] };
    }
  }

  if (search) {
    filters.name = { $regex: search, $options: 'i' };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.pricePerDay = {};
    if (minPrice !== undefined) {
      filters.pricePerDay.$gte = Number(minPrice);
    }
    if (maxPrice !== undefined) {
      filters.pricePerDay.$lte = Number(maxPrice);
    }
    if (Object.keys(filters.pricePerDay).length === 0) {
      delete filters.pricePerDay;
    }
  }

  const toolsQuery = Tool.find(filters);
  const [totalItems, tools] = await Promise.all([
    toolsQuery.clone().countDocuments(),
    toolsQuery.skip(skip).limit(limitNumber),
  ]);
  const totalPages = Math.ceil(totalItems / limitNumber);

  res.status(200).json({
    page: pageNumber,
    limit: limitNumber,
    totalItems,
    totalPages,
    tools,
  });
};

function parseSpecifications(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce((acc, line, index) => {
      const separatorIndex = line.indexOf(':');

      if (separatorIndex === -1) {
        throw new Error(
          `Invalid format in line ${index + 1}. Symbol ":" not found`,
        );
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      if (!key || !value) {
        throw new Error(`Empty key or value in line ${index + 1}`);
      }

      acc[key] = value;
      return acc;
    }, {});
}

export const createTool = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    const cloudinaryResponse = await saveFileToCloudinary(req.file.buffer);

    const { specifications, ...rest } = req.body;

    let parsedSpecs = {};
    if (specifications) {
      try {
        parsedSpecs = parseSpecifications(specifications);
      } catch (err) {
        return res.status(400).json({
          message: err.message || 'Invalid specifications format',
        });
      }
    }

    const newTool = await Tool.create({
      ...rest,
      owner: req.user.id,
      images: cloudinaryResponse.secure_url,
      specifications: parsedSpecs,
    });

    res.status(201).json({ status: 'success', data: newTool });
  } catch (error) {
    next(error);
  }
};

export const updateTool = async (req, res, next) => {
  try {
    const { toolId } = req.params;
    const userId = req.user.id;

    const tool = await Tool.findById(toolId);

    if (!tool) {
      return next(createHttpError(404, 'Tool not found'));
    }
    if (tool.owner.toString() !== userId.toString()) {
      return next(createHttpError(403, 'Access denied: You are not the owner'));
    }

    const { specifications, imageUrl, ...rest } = req.body;
    const updateData = { ...rest };

    if (req.file) {
      const cloudinaryResponse = await saveFileToCloudinary(req.file.buffer);
      updateData.images = cloudinaryResponse.secure_url;
    } else if (imageUrl) {
      updateData.images = imageUrl;
    }

    if (specifications) {
      try {
        updateData.specifications = parseSpecifications(specifications);
      } catch (err) {
        return res.status(400).json({
          message: err.message || 'Invalid specifications format',
        });
      }
    }

    const updatedTool = await Tool.findByIdAndUpdate(toolId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: updatedTool,
    });
  } catch (error) {
    next(error);
  }
};

export const getToolById = async (req, res, next) => {
  const { toolId } = req.params;
  const tool = await Tool.findById(toolId).populate('feedbacks').populate({
    path: 'bookedDates',
    select: 'startDate endDate -_id',
  });

  if (!tool) {
    next(createHttpError(404, 'Tool not found'));
    return;
  }

  res.status(200).json(tool);
};

export const deleteTool = async (req, res, next) => {
  const { toolId } = req.params;

  const tool = await Tool.findOneAndDelete({
    _id: toolId,
  });

  if (!tool) {
    next(createHttpError(404, 'Tool not found'));
    return;
  }
  res.status(200).json(tool);
};
