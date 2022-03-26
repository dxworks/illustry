import mongoose, { Schema } from 'mongoose';
import { IllustrationTypes } from '../types/illustrations.';

export const IllustrationSchema = new mongoose.Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    projectName: { type: String, required: true, index: true },
    type: { type: String, required: true, enum: IllustrationTypes },
    name: { type: String, required: true },
    tags: [{ type: String, required: false }],
    data: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, required: false },
    lastModified: { type: Date, required: false }
})
const IllustrationTable = mongoose.model('Illustration', IllustrationSchema);
IllustrationSchema.index({ ProjectName: 1, Type: 1, Name: 1 }, { unique: true })
IllustrationSchema.index({ ProjectName: 1, Name: 1 })
export default IllustrationTable;