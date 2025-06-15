import { Type, type Static } from '@sinclair/typebox';
export const SectionSchema = Type.Object({
  id: Type.Number({
    minimum: 0,
  }),
  title: Type.String({
    minLength: 2,
    maxLength: 100,
  }),
  position: Type.Number({
    minimum: 0,
  }),
});
export type Section = Static<typeof SectionSchema>;

export const SectionItemSchema = Type.Object({
  id: Type.Number({
    minimum: 0,
  }),
  title: Type.String({
    minLength: 2,
    maxLength: 150,
  }),
  url: Type.String({
    format: 'uri',
    minLength: 5,
    maxLength: 2048,
  }),
  section_id: Type.Number({
    minimum: 0,
  }),
});
export type SectionItem = Static<typeof SectionItemSchema>;

export const SectionWithItemsSchema = Type.Object({
  section: SectionSchema,
  items: Type.Array(SectionItemSchema),
});
export type SectionWithItems = Static<typeof SectionWithItemsSchema>;

export const ReminderSchema = Type.Object({
  id: Type.Number({
    minimum: 0,
  }),
  text: Type.String({
    minLength: 5,
    maxLength: 500,
  }),
  completed: Type.Boolean(),
});
export type Reminder = Static<typeof ReminderSchema>;

// --- CreateSectionPayload ---
export const CreateSectionPayloadSchema = Type.Omit(SectionSchema, ['id']);
export type CreateSectionPayload = Static<typeof CreateSectionPayloadSchema>;

// --- CreateSectionItemPayload ---
export const CreateSectionItemPayloadSchema = Type.Omit(SectionItemSchema, ['id']);
export type CreateSectionItemPayload = Static<typeof CreateSectionItemPayloadSchema>;

// --- UpdateSectionPayload ---
export const UpdateSectionPayloadSchema = Type.Partial(SectionSchema);
export type UpdateSectionPayload = Static<typeof UpdateSectionPayloadSchema>;

// --- UpdateSectionItemPayload ---
export const UpdateSectionItemPayloadSchema = Type.Partial(SectionItemSchema);
export type UpdateSectionItemPayload = Static<typeof UpdateSectionItemPayloadSchema>;
