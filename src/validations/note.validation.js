import { z } from "zod";

export const createNoteSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
    content: z.string().min(1, "Content is required")
});

export const updateNoteSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    content: z.string().min(1).optional()
});