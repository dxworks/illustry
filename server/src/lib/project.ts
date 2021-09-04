
import ProjectTable from "../models/Project"
import _ from "lodash"
import { promisify } from 'bluebird';
import IllustrationTable from "../models/Illustrations"
import { Project } from "../types/project";
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";

export const createGitProject = (project: any, next:any) => {
    let projectModel = {
        ProjectName: _.get(project, 'ProjectName', ''),
        ProjectDescription: _.get(project, 'ProjectDescription', '')
    }

    let illustrationModel = {
        ProjectName: _.get(project, 'ProjectName', ''),
        IllustrationName: _.get(project, 'IllustrationName', ''),
        IllustrationData: _.get(project, 'IllustrationData', ''),
        IllustrationType: _.get(project, 'IllustrationType', '')
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
            createGitProject(projectJson, next)
        })
}

export const updateIllustryProject = (project: Project, projectId: string) => {
    return Promise.resolve({})
        .then(() => {
            let query = { _id: { $eq: projectId } };
            let projectUpdate = { ProjectDescription: _.get(project, 'ProjectDescription') }
            return ProjectTable.findOneAndUpdate({ query }, projectUpdate, { new: true });
        })
}

export const queryAllProjects = (next: any) => {
    return ProjectTable.find({}).select('-__v')
        .then((doc: any) => { next(null, doc); return doc })
}

export const findOneProject = (id: string, next: any) => {
    let query = { _id: { $eq: id } }
    return ProjectTable
        .find(query)
        .select(' -_id ProjectName ProjectDescription')
        .cursor()
        .eachAsync((doc: any) => { next(null, doc); return doc })
}

export const updateProject = (id: string, projectDescription: string, next: any) => {
    let update = { ProjectDescription: projectDescription }
    let query = { _id: { $eq: id } }
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

export const deleteProject = (id: string, next: any) => {
    let queryProject = { _id: { $eq: id } }
    let queryIllustration = { ProjectId: { $eq: id } }
    return IllustrationTable
        .deleteMany(queryIllustration)
        .then((doc:any) => {
            return ProjectTable
                .deleteOne(queryProject)
                .then((doc: any) => {
                    return Promise.resolve(doc)
                        .then((doc) => { next(null, { ProjectId: id }) })
                })
                .catch((err:any) => next(err, null) )
        })
        .catch((err:any) => { next(err, null) })
}
