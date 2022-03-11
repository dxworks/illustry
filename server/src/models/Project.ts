import mongoose from 'mongoose';
export const ProjectSchema = new mongoose.Schema({
    ProjectName: { type: string, required: true, index: true, unique: true },
    ProjectDescription: { type: string, required: false },
})

const ProjectTable = mongoose.model('Project', ProjectSchema);

export default ProjectTable;