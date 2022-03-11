import mongoose, { Schema } from 'mongoose';
let graphsType = 'verticalcharts,verticalstackedcharts,chart,timeline,horizontalstackedcharts,horizontalcharts,flg,heb,treemap,layeredgraph,sankeydiagram,matrix,ganttchart,calendarmatrix,graphiz'.split(',')
export const IllustrationSchema = new mongoose.Schema({
    ProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    ProjectName: { type: string, required: true },
    IllustrationType: { type: string, required: true, enum: graphsType },
    IllustrationName: { type: string, required: true },
    Tags: [{ type: string, required: false }],
    IllustrationData: { type: Schema.Types.Mixed, required: true }
})
const IllustrationTable = mongoose.model('Illustration', IllustrationSchema);
export default IllustrationTable;