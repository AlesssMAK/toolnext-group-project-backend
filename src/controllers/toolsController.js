import { Tool } from '../models/tool.js';

export const getTools = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;
    const toolsQuery = Tool.find();

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