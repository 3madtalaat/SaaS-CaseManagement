export const CaseStatus = {
  OPEN: 'OPEN',
  UNDER_INVESTIGATION: 'UNDER_INVESTIGATION',
  BEING_RESOLVED: 'BEING_RESOLVED',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;

export type CaseStatus = (typeof CaseStatus)[keyof typeof CaseStatus];
