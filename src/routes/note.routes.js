import express from "express";
import { createNoteController, getAllNotesController, getNoteController, updateNoteController, deleteNoteController } from "../controllers/note.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", authMiddleware, createNoteController);
router.get("/", authMiddleware, getAllNotesController);
router.get("/:id", authMiddleware, getNoteController);
router.put("/:id", authMiddleware, updateNoteController);
router.delete("/:id", authMiddleware, deleteNoteController);


export default router;