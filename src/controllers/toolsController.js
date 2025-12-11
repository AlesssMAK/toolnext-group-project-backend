import { Tool } from '../models/tool.js';
import mongoose from 'mongoose'; 

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