import mongoose, { Schema } from 'mongoose';

export const RelationSchema = new mongoose.Schema({
    entityTypeId: { type: String, required:true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
    relationsType: { type: Schema.Types.ObjectId, ref: 'RelationType', required: true },
    sourceEntity: { type: String, required:true },
    targetEntity: { type: String, required:true },
    value: { type: Number, required: true },
    projectName: { type: String, required:true },
})

const RelationTable = mongoose.model('Relation', RelationSchema);

export default RelationTable;