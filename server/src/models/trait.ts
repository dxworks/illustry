import mongoose, { Schema } from 'mongoose';

export const TraitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId, ref: 'Entity', required: false },
    value: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false }
})

const TraitTable = mongoose.model('Trait', TraitSchema);

export default TraitTable;