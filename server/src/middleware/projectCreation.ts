import * as createProjectApi from "../api_/projectCreation";
import formidable from 'formidable'
import _ from 'lodash';
const form = formidable({ multiples: true });
export const createProject  = (req:any, res:any, next: any ) => {
    const file = req
    form.parse(file, (err:any, fields:any, files:any) => {
        let projectId = fields 
        createProjectApi.createProject(files.jsonFile.path, projectId );
    })
    
    res.send(200)
}

 