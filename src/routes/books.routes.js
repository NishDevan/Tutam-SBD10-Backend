import express from "express";
import Book from "../models/books.model.js";

const router = express.Router();

// GET /api/books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// POST /api/books
router.post("/", async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = await Book.create({ title, author, year });
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: "Error adding book" });
    }
});

// PUT /api/books/:id
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: "Error updating book" });
    }
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Error deleting book" });
    }
});

export default router;