
import * as createProjectLib from "../lib/projectCreation"

export function createProject(filePath:any, projectId:any) {
    createProjectLib.createProject(filePath, projectId)
}

// export function getAllProjectsIds(req:any,res:any,next:any) {
//     return projectExtraction.getAllProjectsIds(req,res,next)
// }