
import ProjectTable from "../models/Project"
import _ from "lodash"
import { promisify } from 'bluebird';
import IllustrationTable from "../models/Illustrations"
import { Project } from "../types/project";
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";

export const createProjectfromExtern = (project: any, next:any) => {
    let projectModel = {
        ProjectName: _.get(project, 'ProjectName', ''),
        ProjectDescription: _.get(project, 'ProjectDescription', '')
    }

    let illustrationModel = {
        ProjectName: _.get(project, 'ProjectName', ''),
        IllustrationName: _.get(project, 'IllustrationName', ''),
        IllustrationData: _.get(project, 'IllustrationData', ''),
        IllustrationType: _.get(project, 'IllustrationType', ''),
        Tags: _.get(project, 'Tags')
    }
    let projectTable = new ProjectTable(projectModel)
    projectTable.save((err: any) => {
        if (err)
            next(err,null)
        _.assign(illustrationModel, { ProjectId: projectTable._id })
        let illustrationTable = new IllustrationTable(illustrationModel)
        illustrationTable.save((err: any) => {
            if (err)
                next(err,null)
            next(null, { result: "Project created" })
        })
    })
}

 
export const createIllustryProject = (file: FileProperties, project: Project, next: any) => {
    return promisify(readFile)(file, project)
        .then((projectJson) => {
            createProjectfromExtern(projectJson, next)
        })
}


export const updateProjectfromEtern = (project:any,next:any) => {
    const projectToBeUpdated = {
        ProjectName: _.get(project,"ProjectName"),
        ProjectDescription: _.get(project,'ProjectDescription')
    }
    return Promise.resolve()
    .then(()=> {return updateProject(projectToBeUpdated.ProjectName,projectToBeUpdated.ProjectDescription,next)})

}
export const queryAllProjects = (next: any) => {
    return ProjectTable.find({}).select('-__v')
        .then((doc: any) => { next(null, doc); return doc })
}
 
export const findOneProject = (projectName: string, next: any) => {
    let query = { ProjectName: { $eq: projectName } }
    return ProjectTable
        .find(query)
        .select(' -_id ProjectName ProjectDescription')
        .cursor()
        .eachAsync((doc: any) => { next(null, doc); return doc })
}
 
export const getOneProjectfromEtern = (project:any,next:any) => {
    const projectName = _.get(project,"ProjectName")
    
    return Promise.resolve()
    .then(()=> {return findOneProject(projectName,next)})
}

export const updateProject = (projectName: string, projectDescription: string, next: any) => {
    let update = { ProjectDescription: projectDescription }
    let query = { ProjectName: { $eq: projectName } }
    return ProjectTable
        .findOneAndUpdate(query, update, { new: true })
        .select(' -_id ProjectName ProjectDescription')
        .then((doc: any) => {
            return Promise.resolve(doc)
                .then((doc) => { next(null, doc) })
                .catch((err:any) => { next(err, null) })
        })
      
        .catch((err:any) => { next(err, null) })
}
 
 
export const deleteProject = (projectName: string, next: any) => {
    let queryProject = { ProjectName: { $eq: projectName } }
    let queryIllustration = { ProjectName: { $eq: projectName } }
    return IllustrationTable
        .deleteMany(queryIllustration)
        .then((doc:any) => {
            return ProjectTable
                .deleteOne(queryProject)
                .then((doc: any) => {
                    return Promise.resolve(doc)
                        .then((doc) => { next(null, { ProjectName: projectName }) })
                })
                .catch((err:any) => next(err, null) )
        })
        .catch((err:any) => { next(err, null) })
}
