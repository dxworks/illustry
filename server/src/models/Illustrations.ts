import mongoose, { Schema } from 'mongoose';
import { IllustrationTypes } from '../types/illustrations.';

export const IllustrationSchema = new mongoose.Schema({
    ProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    ProjectName: { type: String, required: true },
    Type: { type: String, required: true, enum: IllustrationTypes },
    Name: { type: String, required: true },
    Tags: [{ type: String, required: false }],
    Data: { type: Schema.Types.Mixed, required: true },
    CreatedAt: { type: Date, required: false },
    LastModified: { type: Date, required: false }
})
const IllustrationTable = mongoose.model('Illustration', IllustrationSchema);
IllustrationSchema.index({ ProjectName: 1, Type: 1, Name: 1 }, { unique: true })
export default IllustrationTable;