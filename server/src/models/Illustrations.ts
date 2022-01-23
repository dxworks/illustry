import mongoose, { Schema } from 'mongoose';
let graphsType = 'verticalcharts,verticalstackedcharts,horizontalstackedcharts,horizontalcharts,flg,heb,treemap,layeredgraph,sankeydiagram,matrix,ganttchart,calendarmatrix,graphiz'.split(',')
export const IllustrationSchema = new mongoose.Schema({
    ProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    ProjectName: { type: String, required: true },
    IllustrationType: { type: String, required: true, enum: graphsType },
    IllustrationName: { type: String, required: true },
    Tags: { type: String, required: false },
    IllustrationData: { type: Schema.Types.Mixed, required: true }
})

const IllustrationTable = mongoose.model('Illustration', IllustrationSchema);

export default IllustrationTable;