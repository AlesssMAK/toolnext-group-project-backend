import { Router } from 'express';
import { getTools } from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';
import { getToolsSchema } from '../validations/toolsValidation.js';

const toolRouters = Router();

toolRouters.get("/api/tools", celebrate(getToolsSchema), getTools);

export default toolRouters;