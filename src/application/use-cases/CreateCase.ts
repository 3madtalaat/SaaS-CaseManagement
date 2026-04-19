// src/application/use-cases/CreateCase.ts
import { CaseRepository } from "../ports/CaseRepository";
import { Case } from "../../domain/entities/Case";

export class CreateCase {
  constructor(private caseRepo: CaseRepository) {}

  async execute(input: {
    tenantId: string;
    customerId: string;
    subject: string;
    description: string;
  }): Promise<Case> {
    const newCase: Omit<Case, "id" | "createdAt" | "updatedAt"> = {
      tenantId: input.tenantId,
      customerId: input.customerId,
      subject: input.subject,
      description: input.description,
      status: "open",
    };

    return this.caseRepo.create(newCase);
  }
}
