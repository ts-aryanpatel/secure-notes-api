import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from "../services/note.service.js";

export const createNoteController = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllNotesController = async (req, res) => {
    try {
        const notes = await getAllNotes(req.user.id);

        res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            data: notes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getNoteController = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await getNoteById(id, req.user.id);

        res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            data: note
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const updateNoteController = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedNote = await updateNote(id, req.user.id, req.body);

        res.status(200).json({
            success: true,
            message: "Note updated Successfully",
            data: updatedNote
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteNoteController = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteNote(id, req.user.id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        res.staus(400).json({
            success: false,
            message: error.message
        });
    }
};