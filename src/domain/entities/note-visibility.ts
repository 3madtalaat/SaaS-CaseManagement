export const NoteVisibility = {
  PUBLIC: 'PUBLIC',
  INTERNAL: 'INTERNAL',
} as const;

export type NoteVisibility = (typeof NoteVisibility)[keyof typeof NoteVisibility];
