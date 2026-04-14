import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from "../services/note.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const createNoteController = asyncHandler(async (req, res) => {

    const { title, content } = req.body;

    const note = await createNote({
        title,
        content,
        userId: req.user.id
    });

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: note
    });
});

export const getAllNotesController = asyncHandler(async (req, res) => {
    
    const notes = await getAllNotes(req.user.id);

    res.status(200).json({
        success: true,
        message: "Notes fetched successfully",
        data: notes
    });
    
});

export const getNoteController = asyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const note = await getNoteById(id, req.user.id);

    res.status(200).json({
        success: true,
        message: "Note fetched successfully",
        data: note
    });
   
});

export const updateNoteController = asyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const updatedNote = await updateNote(id, req.user.id, req.body);

    res.status(200).json({
        success: true,
        message: "Note updated Successfully",
        data: updatedNote
    });
   
});

export const deleteNoteController = asyncHandler(async (req, res) => {
    
    const { id } = req.params;

    const result = await deleteNote(id, req.user.id);

    res.status(200).json({
        success: true,
        message: result.message
    });
   
});