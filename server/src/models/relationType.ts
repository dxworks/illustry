import mongoose, { Schema } from 'mongoose';

export const RelationTypeSchema = new mongoose.Schema({
    name: { type:String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    projectName: { type: String , required: true }
})

const RelationTypeTable = mongoose.model('RelationType', RelationTypeSchema);

export default RelationTypeTable;