import Note from "../models/note.model.js";

export const createNote = async ({ title, content, userId }) => {
    const note = await Note.create({
        title,
        content,
        userId
    });

    return note;
};

export const getAllNotes = async ( userId ) => {
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    return notes;
};

export const getNoteById = async (noteId, userId) => {
    const note = await Note.findById(noteId);

    if (!note) {
        throw new Error("Note not found");
    }

    if (note.userId.toString() !== userId) {
        throw new Error("Unauthorized access");
    }

    return note;
};

export const updateNote = async (noteId, userId, data) => {
    const note = await Note.findById(noteId);

    if (!note) {
        throw new Error("Note not found");
    }

    if (note.userId.toString() !== userId) {
        throw new Error("Unauthorized access");
    }

    note.title = data.title || note.title;
    note.content = data.content || note.content;

    await note.save();

    return note;
};

export const deleteNote = async (noteId, userId) => {
    const note = await Note.findById(noteId);

    if (!note) {
        throw new Error("Note not found");
    }

    if (note.userId.toString() !== userId) {
        throw new Error("Unauthorized access");
    }

    await note.deleteOne();

    return { message: "Note deleted Successfully"};
};