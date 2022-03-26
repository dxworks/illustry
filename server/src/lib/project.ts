
import ProjectTable from "../models/Project"
import _ from "lodash"
import { Promise } from 'bluebird';
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
                _.assign(projectModel, { CreatedAt: new Date() })
                _.assign(projectModel, { LastModified: new Date() })
                let fprj = {
                    Name: projectModel.name,
                    Description: projectModel.description,
                    CreatedAt: _.get(projectModel, 'CreatedAt'),
                    LastModified: _.get(projectModel, 'LastModified')
                }
                let projectTable = new ProjectTable(fprj)
                projectTable.save((err: any) => {
                    if (err) {
                        next("Duplicated name of project", null)
                    }
                    _.assign(illustrationModel, { ProjectId: projectTable._id })
                    _.assign(illustrationModel, { CreatedAt: new Date() })
                    _.assign(illustrationModel, { LastModified: new Date() })
                    let finalIllustration = {
                        Data: illustrationModel.data,
                        ProjectName: illustrationModel.projectName,
                        Name: illustrationModel.name,
                        Type: illustrationModel.type,
                        ProjectId: _.get(illustrationModel, 'projectId'),
                        Tags: illustrationModel.tags,
                        CreatedAt: _.get(illustrationModel, 'CreatedAt'),
                        LastModified: _.get(illustrationModel, 'LastModified')
                    }
                    let illustrationTable = new IllustrationTable(finalIllustration)
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

                        _.assign(projectModel, { CreatedAt: new Date() })
                        _.assign(projectModel, { LastModified: new Date() })
                        let fprj = {
                            Name: projectModel.name,
                            Description: projectModel.description,
                            CreatedAt: _.get(projectModel, 'CreatedAt'),
                            LastModified: _.get(projectModel, 'LastModified')
                        }
                        let projectTable = new ProjectTable(fprj)
                        projectTable.save((err: any) => {
                            if (err) {

                                next("Duplicated name of project", null)
                            }
                            else {
                                return readFile(files)
                                    .then((projectsJson: any) => {
                                        return Promise.map(projectsJson, projectJson => {

                                            let illustrationModel: Illustration = {
                                                data: _.get(projectJson, 'IllustrationData'),
                                                projectName: projectModel.name,
                                                name: _.get(projectJson, 'IllustrationName'),
                                                type: _.get(projectJson, 'IllustrationType'),
                                                projectId: projectTable._id,
                                                tags: _.get(projectJson, 'Tags')
                                            }
                                            return Promise.resolve()
                                                .then(() => { return illustrationValidator(illustrationModel) })
                                                .then((valid: boolean) => {
                                                    if (valid) {
                                                        return Promise.resolve(illustrationModel)

                                                            .then((res) => {

                                                                _.assign(res, { CreatedAt: new Date() })
                                                                _.assign(res, { LastModified: new Date() })
                                                                let finalRes = {
                                                                    Data: res.data,
                                                                    ProjectName: res.projectName,
                                                                    Name: res.name,
                                                                    Type: res.type,
                                                                    ProjectId: res.projectId,
                                                                    Tags: res.tags,
                                                                    CreatedAt: _.get(res, 'CreatedAt'),
                                                                    LastModified: _.get(res, 'LastModified')
                                                                }
                                                                let illustrationTable = new IllustrationTable(finalRes)
                                                                illustrationTable.save((err: any) => {
                                                                    if (err)
                                                                        next(err, null)
                                                                })

                                                            })
                                                            .then((res: any) => {
                                                                next(null, "Project created")
                                                            })
                                                            .catch((err: any) => next(err, null))
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
        Name: projectName,
        Description: projectDescription
    }
    return Promise.resolve()
        .then(() => {
            return validateProjectNameAsStringAndProjectDescriptionAsString(projectToBeUpdated.Name, projectToBeUpdated.Description)
        })
        .then((valid: boolean) => {
            if (valid) {
                return updateProject(projectToBeUpdated.Name, projectToBeUpdated.Description, next)
            }
        })
        .catch(err => next(err, null))
}
export const queryAllProjects = (next: any) => {
    return ProjectTable.find({}).select('-__v')
        .then((doc: any) => { next(null, doc); return doc })
}

export const findOneProject = (projectName: string, next: any) => {
    let query = { ProjectName: { $eq: projectName } }
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
    let update = { Description: projectDescription, LastModified: new Date() }
    let query = { Name: { $eq: projectName } }
    return Promise.resolve()
        .then(() => {
            return validateProjectNameAsStringAndProjectDescriptionAsString(projectName, projectDescription)
        })
        .then((valid: boolean) => {
            if (valid) {
                return ProjectTable
                    .findOneAndUpdate(query, update, { new: true })
                    .select(' -_id ProjectName ProjectDescription')
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
    let queryProject = { Name: { $eq: projectName } }
    let queryIllustration = { ProjectName: { $eq: projectName } }
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
                                    .then((doc) => { next(null, { ProjectName: projectName }) })
                            })
                            .catch((err: any) => next(err, null))
                    })
                    .catch((err: any) => { next(err, null) })
            }
        })
}



