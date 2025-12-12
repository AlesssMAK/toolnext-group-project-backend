import createHttpError from 'http-errors';
import { Tool } from '../models/tool.js';
import mongoose from 'mongoose'; 
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getTools = async (req, res) => {
    const { page = 1, limit = 10, categories, search } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    const filters = {};
     if (categories) {
        const categoryIdsString = categories.split(',');
        
        
        const categoryObjectIds = categoryIdsString.map(id => {
            
            if (mongoose.Types.ObjectId.isValid(id)) {
                return new mongoose.Types.ObjectId(id);
            }
            return null; 
        }).filter(id => id !== null); 

        if (categoryObjectIds.length > 0) {
            filters.category = { $in: categoryObjectIds };
        } else if (categories.length > 0 && categoryObjectIds.length === 0) {
            
            filters.category = { $in: [] }; 
        }
    };

    if (search) {
        filters.name = { $regex: search, $options: 'i' }; 
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
                parsedSpecs = typeof specifications === 'string'
                    ? JSON.parse(specifications)
                    : specifications;
            } catch  {
                return res.status(400).json({ message: 'Invalid JSON in specifications' });
            }
        }

        const newTool = await Tool.create({
            ...rest,
            owner: req.user._id ,
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
        const userId = req.user._id;
        
        const tool = await Tool.findById(toolId);

        if (!tool) {
            return next(createHttpError(404, 'Tool not found'));
        };
        if (tool.owner.toString() !== userId.toString()) {
            return next(createHttpError(403, 'Access denied: You are not the owner'));
        };

        const { specifications, ...rest } = req.body;
        const updateData = { ...rest };
        
        if (req.file) {
            const cloudinaryResponse = await saveFileToCloudinary(req.file.buffer);
            updateData.images = cloudinaryResponse.secure_url;
        } 
        if (specifications) {
            try {
                updateData.specifications = typeof specifications === 'string'
                    ? JSON.parse(specifications)
                    : specifications;
            } catch {
                return next(createHttpError(400, 'Invalid JSON in specifications'));
            }
        } 
        const updatedTool = await Tool.findByIdAndUpdate(
            toolId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            data: updatedTool,
        });
    } catch (error) {
        next(error);
    }
};