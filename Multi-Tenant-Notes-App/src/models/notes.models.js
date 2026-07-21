import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
    minLength: [5, "title must be at least 5 characters long"],
    maxLength: [100, "title cannot exceed 100 characters"]
  },
  content: {
    type: String,
    required: [true, "content is required"],
    trim: true,
    maxLength: [1000, "content cannot exceed 1000 characters"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user reference is required"],
    index: true
  }
}, {
  timestamps: true
});

// ✅ Compound unique index on title + content + user
noteSchema.index({ title: 1, content: 1, user: 1 }, { unique: true });

const Note = mongoose.model("Note", noteSchema);
export default Note;
