import express from "express";
import { createNoteController, getAllNotesController, getNoteController, updateNoteController, deleteNoteController } from "../controllers/note.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createNoteSchema, updateNoteSchema } from "../validations/note.validation.js";

const router = express.Router();


router.post("/", authMiddleware, validate(createNoteSchema), createNoteController);
router.get("/", authMiddleware, getAllNotesController);
router.get("/:id", authMiddleware, getNoteController);
router.put("/:id", authMiddleware, validate(updateNoteSchema), updateNoteController);
router.delete("/:id", authMiddleware, deleteNoteController);


export default router;