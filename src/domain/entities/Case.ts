// src/domain/entities/Case.ts
export interface Case {
    id: string;
    tenantId: string;
    customerId: string;
    subject: string;
    description: string;
    status: "open" | "closed";
    createdAt: Date;
    updatedAt: Date;
  }
  