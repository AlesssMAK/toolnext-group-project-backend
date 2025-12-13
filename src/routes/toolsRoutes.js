import { Router } from 'express';
import { getTools, getToolById, deleteTool, createTool, updateTool} from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';
import { getToolsSchema, toolIdParamSchema, createToolSchema, updateToolSchema } from '../validations/toolsValidation.js';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';



const toolRouters = Router();

toolRouters.get("/api/tools", celebrate(getToolsSchema), getTools);

toolRouters.post("/api/tools", authenticate, upload.single("image"), celebrate(createToolSchema), createTool);

toolRouters.patch("/api/tools/:toolId", authenticate, upload.single("image"), celebrate(updateToolSchema), updateTool);

toolRouters.get("/api/tools/:toolId", celebrate(toolIdParamSchema), getToolById);

toolRouters.delete("/api/tools/:toolId", authenticate, celebrate(toolIdParamSchema), deleteTool);


export default toolRouters;