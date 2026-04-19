// src/application/ports/CaseRepository.ts
import { Case } from "../../domain/entities/Case";

export interface CaseRepository {
  create(caseData: Omit<Case, "id" | "createdAt" | "updatedAt">): Promise<Case>;
  findById(id: string): Promise<Case | null>;
}
