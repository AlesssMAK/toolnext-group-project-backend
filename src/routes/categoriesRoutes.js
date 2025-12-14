import { Router } from "express";
import { getAllCategories, createCategory } from "../controllers/categoryController.js";

const router = Router();

router.get("/", getAllCategories);

// Додай POST-ендпоінт
router.post("/", createCategory);

export default router;


