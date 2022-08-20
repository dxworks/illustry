import { illustrationBZL } from "./illustrations";
import { projectBZL } from "./project";
import { timelineComputeBZL } from "./timelineCompute";

export const BZL = {
    illustrationApi: illustrationBZL,
    projectApi: projectBZL,
    timelineComputeApi: timelineComputeBZL
}

export type bzlType = typeof BZL