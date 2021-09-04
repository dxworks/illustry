import mongoose, { Schema } from 'mongoose';

export const EntityTypeSchema = new mongoose.Schema({
    name: { type:String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    projectName: {type: String, required: true }
    // entities: [{type: Schema.Types.ObjectId, ref: 'Entity', required: false}]
})

const EntityTypeTable = mongoose.model('EntityType', EntityTypeSchema);

export default EntityTypeTable;