import { illustrationApi } from "./illustrations";
import { projectApi } from "./project";
import { timelineComputeApi } from "./timelineCompute";

export const API ={ 
    illustrationApi,
    projectApi,
    timelineComputeApi   
}

export type apiType = typeof API