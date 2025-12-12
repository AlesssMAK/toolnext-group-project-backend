import { Router } from 'express';
import { getTools, createTool, updateTool} from '../controllers/toolsController.js';
import { celebrate } from 'celebrate';
import { getToolsSchema, createToolSchema, updateToolSchema } from '../validations/toolsValidation.js';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const toolRouters = Router();

toolRouters.get("/api/tools", celebrate(getToolsSchema), getTools);

toolRouters.post("/api/tools", authenticate, upload.single("image"), celebrate(createToolSchema), createTool);

toolRouters.patch("/api/tools/:toolId", authenticate, upload.single("image"), celebrate(updateToolSchema), updateTool);

export default toolRouters;