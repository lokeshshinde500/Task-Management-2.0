import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "in progress"],
      default: "pending",
    },
    category: {
      type: String,
      required: true, 
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", taskSchema);

export default taskModel;
