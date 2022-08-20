import { IllustrationTypes } from "types/illustrations";
import mongoose, { Schema } from "mongoose";
const illustrationTypes = [IllustrationTypes.CALENDAR,
IllustrationTypes.CHART,
IllustrationTypes.FORCE_DIRECTED_GRAPH,
IllustrationTypes.GRAPHVIZ, IllustrationTypes.HIERARCHICAL_EDGE_BUNDLING,
IllustrationTypes.MATRIX,
IllustrationTypes.PLOTLY,
IllustrationTypes.SANKEY,
IllustrationTypes.TIMELINE,
IllustrationTypes.TREEMAP,
IllustrationTypes.WORLD_CLOUD]
export var IllustrationSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  //@ts-ignore
  type: { type: String, required: true, enum: illustrationTypes },
  description: { type: String, required: false, maxLength: 250 },
  name: { type: String, required: true },
  tags: [{ type: String, required: false }],
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, required: false },
  lastModified: { type: Date, required: false },
});
IllustrationSchema.index(
  { projectName: 1, type: 1, name: 1 },
);
IllustrationSchema.index({ projectName: 1, name: 1 });
const IllustrationTable = mongoose.model("Illustration", IllustrationSchema);

export default IllustrationTable;
