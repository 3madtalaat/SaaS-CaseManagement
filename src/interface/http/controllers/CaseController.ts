// src/interface/http/controllers/CaseController.ts
import { Request, Response } from "express";
import { CreateCase } from "../../../application/use-cases/CreateCase";
import { MongoCaseRepository } from "../../../infrastructure/database/MongoCaseRepository";

const caseRepo = new MongoCaseRepository();
const createCase = new CreateCase(caseRepo);

export async function createCaseHandler(req: Request, res: Response) {
  try {
    const caseData = await createCase.execute({
      tenantId: req.body.tenantId,
      customerId: req.body.customerId,
      subject: req.body.subject,
      description: req.body.description,
    });
    res.status(201).json(caseData);
  } catch {
    res.status(500).json({ error: 'Failed to create case' });
  }
}
