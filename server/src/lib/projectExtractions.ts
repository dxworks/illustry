// import ProjectTable from "../database/project"
// import { AllProjectReq } from "../models/allProjectReq"
// import * as _ from 'lodash'
// export const getAllProjectsIds = (next) => {
//     let projectIds:AllProjectReq[] = []

//     let projectsTable = ProjectTable.find({},'-_id, -Entities, -Relations, -__v,-Traits,-Properties,-Classifiers', null, function(err:any, projects:any) {
//         if(err) {
//             return next(err);
//         }
//         else
//         {   _.forEach(projects, (project)=>{
//             projectIds.push({projectId:_.get(project,'ProjectId','')})
//      
//         })
//           next(null, projectIds)
//         }
//     })

// }
