import mongoose, { Schema } from 'mongoose';
let graphsType = 'chart,timeline,flg,heb,treemap,sankeydiagram,matrix,calendarmatrix,graphiz'.split(',')
export const IllustrationSchema = new mongoose.Schema({
    ProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    ProjectName: { type: String, required: true },
    IllustrationType: { type: String, required: true, enum: graphsType },
    IllustrationName: { type: String, required: true },
    Tags: [{ type: String, required: false }],
    IllustrationData: { type: Schema.Types.Mixed, required: true },
    CreatedAt: { type: Date, required: false },
    LastModified: { type: Date, required: false }
})
const IllustrationTable = mongoose.model('Illustration', IllustrationSchema);
export default IllustrationTable;