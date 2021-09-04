import mongoose, { Schema } from 'mongoose';

export const PropertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    entityId: { type:String, required:true },
    value: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false }
})

const PropertyTable = mongoose.model('Property', PropertySchema);

export default PropertyTable;