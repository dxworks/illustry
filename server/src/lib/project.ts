
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
        ProjectName: projectName,
        ProjectDescription: projectDescription
    }

    let illustrationModel: IllustrationUpdate = {
        ProjectName: projectName,
        IllustrationName: illustrationName,
        IllustrationData: illustrationData,
        IllustrationType: illustrationType,
        Tags: tags
    }
    return Promise.resolve()
        .then(() => { return validateProject(projectModel, illustrationModel) })
        .then((valid: boolean) => {
            if (valid) {
                let projectTable = new ProjectTable(projectModel)
                projectTable.save((err: any) => {
                    if (err) {
                        next("Duplicated name of project", null)
                    }
                    _.assign(illustrationModel, { ProjectId: projectTable._id })
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
            let projectModel = {
                ProjectName: project.ProjectName,
                ProjectDescription: project.ProjectDescription
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
                        let projectTable = new ProjectTable(projectModel)
                        projectTable.save((err: any) => {
                            if (err) {

                                next("Duplicated name of project", null)
                            }
                            else {
                                return readFile(files)
                                    .then((projectsJson: any) => {
                                        return Promise.map(projectsJson, projectJson => {

                                            let illustrationModel: Illustration = {
                                                IllustrationData: _.get(projectJson, 'IllustrationData'),
                                                ProjectName: projectModel.ProjectName,
                                                IllustrationName: _.get(projectJson, 'IllustrationName'),
                                                IllustrationType: _.get(projectJson, 'IllustrationType'),
                                                ProjectId: projectTable._id,
                                                Tags: _.get(projectJson, 'Tags')
                                            }
                                            return Promise.resolve()
                                                .then(() => { return illustrationValidator(illustrationModel) })
                                                .then((valid: boolean) => {
                                                    if (valid) {
                                                        return Promise.resolve(illustrationModel)

                                                            .then((res) => {
                                                                let illustrationTable = new IllustrationTable(res)
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
        ProjectName: projectName,
        ProjectDescription: projectDescription
    }
    return Promise.resolve()
        .then(() => {
            return validateProjectNameAsStringAndProjectDescriptionAsString(projectToBeUpdated.ProjectName, projectToBeUpdated.ProjectDescription)
        })
        .then((valid: boolean) => {
            if (valid) {
                return updateProject(projectToBeUpdated.ProjectName, projectToBeUpdated.ProjectDescription, next)
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
    let update = { ProjectDescription: projectDescription }
    let query = { ProjectName: { $eq: projectName } }
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
    let queryProject = { ProjectName: { $eq: projectName } }
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



