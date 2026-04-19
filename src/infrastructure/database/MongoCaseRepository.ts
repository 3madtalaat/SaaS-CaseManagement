// src/infrastructure/database/MongoCaseRepository.ts
import { CaseRepository } from "../../application/ports/CaseRepository";
import { Case } from "../../domain/entities/Case";
import { v4 as uuid } from "uuid";

export class MongoCaseRepository implements CaseRepository {
  async create(caseData: Omit<Case, "id" | "createdAt" | "updatedAt">): Promise<Case> {
    const newCase: Case = {
      ...caseData,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Imagine inserting into MongoDB here
    console.log("Inserted case into MongoDB:", newCase);
    return newCase;
  }

  async findById(_id: string): Promise<Case | null> {
    // Query MongoDB here
    return null;
  }
}
