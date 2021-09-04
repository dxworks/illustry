import mongoose, { Schema } from 'mongoose';

export const ClassifierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    entityTypeId: { type: Schema.Types.ObjectId, ref: 'EntityType', required: false },
    categories: [{
        name: { type: String, required: true },
        isDefault: { type: Boolean, required: true },
        entities: [{ type: String, required: true }]
    }]
    // Categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: false }]
})

const ClassifierTable = mongoose.model('Classifier', ClassifierSchema);

export default ClassifierTable;