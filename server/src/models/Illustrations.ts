import mongoose, { Schema } from "mongoose";
import { IllustrationTypes } from "../types/illustrations.";
export var IllustrationSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  type: { type: String, required: true, enum: IllustrationTypes },
  description: { type: String, required: false, maxLength: 250 },
  name: { type: String, required: true },
  tags: [{ type: String, required: false }],
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, required: false },
  lastModified: { type: Date, required: false },
});
IllustrationSchema.index(
  { projectName: 1, type: 1, name: 1 },
  { unique: true, background: true }
);
IllustrationSchema.index({ projectName: 1, name: 1 });
const IllustrationTable = mongoose.model("Illustration", IllustrationSchema);

export default IllustrationTable;
