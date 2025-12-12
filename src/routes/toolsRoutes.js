import { Router } from 'express';
import { getTools,getToolById, deleteTool } from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';
import { getToolsSchema, toolIdParamSchema} from '../validations/toolsValidation.js';
import { authenticate } from "../middleware/authenticate.js";

const toolRouters = Router();

toolRouters.get("/api/tools", celebrate(getToolsSchema), getTools);

toolRouters.get("/api/tools/:toolId", celebrate(toolIdParamSchema), getToolById);

toolRouters.delete("/api/tools/:toolId", authenticate, celebrate(toolIdParamSchema), deleteTool);



export default toolRouters;