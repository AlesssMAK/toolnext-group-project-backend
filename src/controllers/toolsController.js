import { Tool } from '../models/tool.js';

export const getTools = async (req, res) => {
    const tools = await Tool.find();
    res.status(200).json(tools);
};