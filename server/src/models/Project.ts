import mongoose, { Schema } from 'mongoose';
export const ProjectSchema = new mongoose.Schema({
    ProjectName: { type: String, required: true, index: true, unique: true },
    ProjectDescription: { type: String, required: false },
})

const ProjectTable = mongoose.model('Project', ProjectSchema);

export default ProjectTable;