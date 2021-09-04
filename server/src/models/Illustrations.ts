import mongoose, { Schema } from 'mongoose';
let graphsType = 'charts,stackedcharts,horizontal charts,flg,heb,treemap,layeredgraph,sankeydiagram,matrix,ganttchart'.split(',')
export const IllustrationSchema = new mongoose.Schema({
    ProjectId: { type: Schema.Types.ObjectId, ref: 'Project'},
    ProjectName: { type: String, required: true } ,
    IllustrationType: { type: String, required: true, enum: graphsType },
    IllustrationName: { type: String, required:true },
    Tags: { type:String, required: false },
    IllustrationData: { type: Schema.Types.Mixed, required: true }
})

const IllustrationTable = mongoose.model('Illustration', IllustrationSchema);

export default IllustrationTable;