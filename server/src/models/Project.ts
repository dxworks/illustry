import mongoose from 'mongoose';
export const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true, unique: true },
    description: { type: String, required: false },
    createdAt: { type: Date, required: false },
    lastModified: { type: Date, required: false },
})

const ProjectTable = mongoose.model('Project', ProjectSchema);

export default ProjectTable;