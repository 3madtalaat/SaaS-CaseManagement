// src/interface/http/routes/caseRoutes.ts
import { Router } from "express";
import { createCaseHandler } from "../controllers/CaseController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/cases", authMiddleware, createCaseHandler);

export default router;
