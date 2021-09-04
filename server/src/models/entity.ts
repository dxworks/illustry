import mongoose, { Schema } from 'mongoose';

export const EntitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    projectName: {type: String, required: true},
    type: { type: Schema.Types.ObjectId, ref: 'EntityType', required: false },
    //CategoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
    
})

const EntityTable = mongoose.model('Entity', EntitySchema);

export default EntityTable;