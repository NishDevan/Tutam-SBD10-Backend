import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        year: { type: Number, required: true },
        status: { type: String, enum: ["Available", "Borrowed"], default: "Available" },
    }, 
    { timestamps: true }
);

export default mongoose.model("Book", bookSchema);