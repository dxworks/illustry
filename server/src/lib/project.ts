
import ProjectTable from "../models/Project"
import _ from "lodash"
import { any, Promise } from 'bluebird';
import IllustrationTable from "../models/Illustrations"
import { Project } from "../types/project";
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";
import { validateProject, validateProjectNameAsString, validateProjectNameAsStringAndProjectDescriptionAsString } from '../validator/projectValidator';
import { Illustration, IllustrationUpdate } from "../types/illustrations.";
import { illustrationValidator } from "../validator/illustrationValidator";
export const createProjectfromExtern = (projectName: string, projectDescription: string, illustrationName: string, illustrationType: string, tags: string[], illustrationData: any, next: any) => {

    let projectModel: Project = {
        name: projectName,
        description: projectDescription
    }

    let illustrationModel: IllustrationUpdate = {
        projectName: projectName,
        name: illustrationName,
        data: illustrationData,
        type: illustrationType,
        tags: tags
    }
    return Promise.resolve()
        .then(() => { return validateProject(projectModel, illustrationModel) })
        .then((valid: boolean) => {
            if (valid) {
                _.assign(projectModel, { createdAt: new Date() })
                _.assign(projectModel, { lastModified: new Date() })

                let projectTable = new ProjectTable(projectModel)
                projectTable.save((err: any) => {
                    if (err) {
                        next("Duplicated name of project", null)
                    }
                    _.assign(illustrationModel, { projectId: projectTable._id })
                    _.assign(illustrationModel, { createdAt: new Date() })
                    _.assign(illustrationModel, { lastModified: new Date() })

                    let illustrationTable = new IllustrationTable(illustrationModel)
                    illustrationTable.save((err: any) => {
                        if (err)
                            next(err, null)
                        next(null, { result: "Project created" })
                    })
                })
            }
        })

        .catch((err: any) => next(err, null))
}


export const createIllustryProject = (files: FileProperties[], project: Project, next: any) => {
    return Promise.resolve()
        .then(() => {
            let projectModel: Project = {
                name: project.name,
                description: project.description
            }
            return projectModel;
        })
        .then((projectModel) => {
            return Promise.resolve()
                .then(() => {
                    return validateProject(projectModel)
                })
                .then((valid: boolean) => {
                    if (valid) {

                        _.assign(projectModel, { createdAt: new Date() })
                        _.assign(projectModel, { lastModified: new Date() })
                        console.log(projectModel)
                        let projectTable = new ProjectTable(projectModel)
                        projectTable.save((err: any) => {
                            if (err) {
                                console.log(err)
                                next("Duplicated name of project", null)
                            }
                            else {
                                return readFile(files)
                                    .then((projectsJson: any) => {
                                        return Promise.map(projectsJson, (projectJson: any) => {

                                            let illustrationModel: Illustration = {
                                                data: projectJson.data,
                                                projectName: projectModel.name,
                                                name: projectJson.name,
                                                type: projectJson.type,
                                                tags: projectJson.tags
                                            }
                                            return Promise.resolve()
                                                .then(() => { return illustrationValidator(illustrationModel) })
                                                .then((valid: boolean) => {
                                                    if (valid) {
                                                        if (typeof illustrationModel.type === 'string') {
                                                            return IllustrationTable.findOneAndUpdate({
                                                                projectName: illustrationModel.projectName,
                                                                name: illustrationModel.name,
                                                            }, illustrationModel, { upsert: true, new: true })
                                                                .then((res: Illustration) => {
                                                                    if (!res.createdAt) {
                                                                        _.assign(res, { createdAt: new Date() })
                                                                        _.assign(res, { lastModified: new Date() })
                                                                    }
                                                                    else {
                                                                        _.assign(res, { lastModified: new Date() })
                                                                    }
                                                                    return IllustrationTable.findOneAndUpdate({
                                                                        projectName: res.projectName,
                                                                        illustrationName: res.name
                                                                    }, res)
                                                                        .then(() => {
                                                                            next(null, { result: 'Illustrations created' })
                                                                        })
                                                                })
                                                        }
                                                        else {

                                                            return Promise.each(illustrationModel.type, t => {
                                                                let newIllustrationModel: Illustration = {
                                                                    data: illustrationModel.data,
                                                                    projectName: illustrationModel.projectName,
                                                                    name: illustrationModel.name,
                                                                    type: t,
                                                                    tags: illustrationModel.tags
                                                                }
                                                                console.log(newIllustrationModel)
                                                                return IllustrationTable.findOneAndUpdate({
                                                                    projectName: newIllustrationModel.projectName,
                                                                    name: newIllustrationModel.name,
                                                                    type: newIllustrationModel.type
                                                                }, newIllustrationModel, { upsert: true, new: true })
                                                                    .then((res: any) => {

                                                                        if (!res.createdAt) {
                                                                            _.assign(res, { createdAt: new Date() })
                                                                            _.assign(res, { lastModified: new Date() })
                                                                        }
                                                                        else {
                                                                            _.assign(res, { lastModified: new Date() })
                                                                        }
                                                                        return IllustrationTable.findOneAndUpdate({
                                                                            _id: res._id
                                                                        }, res)

                                                                    })
                                                            })
                                                                .then(() => {
                                                                    next(null, { result: 'Illustrations created' })
                                                                })
                                                        }
                                                    }
                                                }).catch((err: any) => next(err, null))

                                        })
                                    })
                            }
                        })
                    }
                })
                .catch(err => next(err, null))
        })
}


export const updateProjectfromEtern = (projectName: string, projectDescription: string, next: any) => {
    const projectToBeUpdated = {
        name: projectName,
        description: projectDescription
    }
    return Promise.resolve()
        .then(() => {
            return validateProjectNameAsStringAndProjectDescriptionAsString(projectToBeUpdated.name, projectToBeUpdated.description)
        })
        .then((valid: boolean) => {
            if (valid) {
                return updateProject(projectToBeUpdated.name, projectToBeUpdated.description, next)
            }
        })
        .catch(err => next(err, null))
}
export const queryAllProjects = (next: any) => {
    return ProjectTable.find({}).select('-__v')
        .then((doc: any) => { next(null, doc); return doc })
}

export const findOneProject = (projectName: string, next: any) => {
    let query = { projectName: { $eq: projectName } }
    return Promise.resolve()
        .then(() => {
            return validateProjectNameAsString(projectName)
        })
        .then((valid: boolean) => {
            if (valid) {
                return ProjectTable
                    .find(query)
                    .select(' -_id ProjectName ProjectDescription')
                    .cursor()
                    .eachAsync((doc: any) => { next(null, doc); return doc })
            }
        })
        .catch(err => next(err, null))
}

export const getOneProjectfromEtern = (projectName: string, next: any) => {

    return Promise.resolve()
        .then(() => { return findOneProject(projectName, next) })
}

export const updateProject = (projectName: string, projectDescription: string, next: any) => {
    let update = { description: projectDescription, lastModified: new Date() }
    let query = { name: { $eq: projectName } }
    return Promise.resolve()
        .then(() => {
            return validateProjectNameAsStringAndProjectDescriptionAsString(projectName, projectDescription)
        })
        .then((valid: boolean) => {
            if (valid) {
                return ProjectTable
                    .findOneAndUpdate(query, update, { new: true })
                    .select(' -_id name description')
                    .then((doc: any) => {
                        return Promise.resolve(doc)
                            .then((doc) => { next(null, doc) })
                            .catch((err: any) => { next(err, null) })
                    })
                    .catch((err: any) => { next(err, null) })
            }
        })
        .catch((err: any) => { next(err, null) })
}


export const deleteProject = (projectName: string, next: any) => {
    let queryProject = { name: { $eq: projectName } }
    let queryIllustration = { projectName: { $eq: projectName } }
    return Promise.resolve()
        .then(() => {
            return validateProjectNameAsString(projectName)
        })
        .then((valid: boolean) => {
            if (valid) {
                return IllustrationTable
                    .deleteMany(queryIllustration)
                    .then((doc: any) => {
                        return ProjectTable
                            .deleteOne(queryProject)
                            .then((doc: any) => {
                                return Promise.resolve(doc)
                                    .then((doc) => { next(null, { name: projectName }) })
                            })
                            .catch((err: any) => next(err, null))
                    })
                    .catch((err: any) => { next(err, null) })
            }
        })
}



