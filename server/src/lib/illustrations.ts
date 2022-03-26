
import ProjectTable from '../models/Project'
import _ from "lodash"
import IllustrationTable from "../models/Illustrations"
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";
import { Promise } from 'bluebird'
import { illustrationValidator, validateProjectNameAndIllustrationNameAsString, validateProjectNameAndIllustrationTypeAsString } from '../validator/illustrationValidator';
import { DOT, CalendarHeatmap, FLG, HEB, Sankey, Matrix, Timeline, Illustration, IllustrationUpdate } from '../types/illustrations.';
import { validateProjectNameAsString } from '../validator/projectValidator';
export const addOrUpdateIllustrations = (projectName: string, files: FileProperties[], next: any) => {

    let query = { Name: { $eq: projectName } };
    return readFile(files)
        .then((projectsJson: any) => {
            return ProjectTable.find(query)
                .cursor()
                .eachAsync((doc: any) => {

                    if (doc)

                        return Promise.map(projectsJson, projectJson => {
                            let illustrationModel: Illustration = {
                                data: _.get(projectJson, 'IllustrationData'),
                                projectName: doc.Name,
                                name: _.get(projectJson, 'IllustrationName'),
                                type: _.get(projectJson, 'IllustrationType'),
                                projectId: doc._id,
                                tags: _.get(projectJson, 'Tags')
                            }
                            if (illustrationValidator(illustrationModel)) {
                                return Promise.resolve(illustrationModel)
                                    .then((illustrationModel) => {
                                        let finalIllustration = {
                                            Data: illustrationModel.data,
                                            ProjectName: illustrationModel.projectName,
                                            Name: illustrationModel.name,
                                            Type: illustrationModel.type,
                                            ProjectId: _.get(illustrationModel, 'projectId'),
                                            Tags: illustrationModel.tags,

                                        }
                                        console.log(finalIllustration)
                                        if (typeof illustrationModel.type === 'string') {
                                            return IllustrationTable.findOneAndUpdate({
                                                ProjectId: illustrationModel.projectId,
                                                ProjectName: illustrationModel.projectName,
                                                Name: illustrationModel.name,
                                            }, finalIllustration, { upsert: true, new: true })
                                                .then((res: any) => {
                                                    if (!res.CreatedAt) {
                                                        _.assign(res, { CreatedAt: new Date() })
                                                        _.assign(res, { LastModified: new Date() })
                                                    }
                                                    else {
                                                        _.assign(res, { LastModified: new Date() })
                                                    }
                                                    return IllustrationTable.findOneAndUpdate({
                                                        ProjectId: res.ProjectId,
                                                        ProjectName: res.ProjectName,
                                                        IllustrationName: res.IllustrationName
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
                                                    projectId: illustrationModel.projectId,
                                                    tags: illustrationModel.tags
                                                }
                                                let finalIllustration = {
                                                    Data: newIllustrationModel.data,
                                                    ProjectName: newIllustrationModel.projectName,
                                                    Name: newIllustrationModel.name,
                                                    Type: newIllustrationModel.type,
                                                    ProjectId: _.get(newIllustrationModel, 'projectId'),
                                                    Tags: newIllustrationModel.tags,

                                                }
                                                return IllustrationTable.findOneAndUpdate({
                                                    ProjectId: newIllustrationModel.projectId,
                                                    ProjectName: newIllustrationModel.projectName,
                                                    Name: newIllustrationModel.name,
                                                    Type: newIllustrationModel.type
                                                }, finalIllustration, { upsert: true, new: true })
                                                    .then((res: any) => {

                                                        if (!res.CreatedAt) {
                                                            _.assign(res, { CreatedAt: new Date() })
                                                            _.assign(res, { LastModified: new Date() })
                                                        }
                                                        else {
                                                            _.assign(res, { LastModified: new Date() })
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
                                    })
                                    .catch((err: any) => next(err, null))
                            }
                        }).catch((err: any) => next(err, null))
                })
        })
}

export const addIllustrationFromOtherSource = (projectName: string, illustrationName: string, illustrationType: string, tags: string[], illustrationData: DOT | CalendarHeatmap | FLG | HEB | Sankey | Matrix | Timeline | any, next: any) => {
    let query = { Name: { $eq: projectName } };

    return ProjectTable.find(query)
        .cursor()
        .eachAsync((doc: any) => {
            if (doc) {
                const illustrationModel: Illustration = {
                    data: illustrationData,
                    projectName: doc.ProjectName,
                    name: illustrationName,
                    type: illustrationType,
                    projectId: doc._id,
                    tags: tags
                }
                return Promise.resolve()
                    .then(() => { return illustrationValidator(illustrationModel) })
                    .then((valid: boolean) => {
                        if (valid) {

                            return Promise.resolve(illustrationModel)
                                .then((res) => {
                                    _.assign(res, { CreatedAt: new Date() })
                                    _.assign(res, { LastModified: new Date() })
                                    let finalIllustration = {
                                        Data: res.data,
                                        ProjectName: res.projectName,
                                        Name: res.name,
                                        Type: res.type,
                                        ProjectId: res.projectId,
                                        Tags: res.tags,
                                        CreatedAt: _.get(res, 'CreatedAt'),
                                        LastModified: _.get(res, 'LastModified')

                                    }
                                    let illustrationTable = new IllustrationTable(finalIllustration)
                                    illustrationTable.save((err: any) => {
                                        if (err)
                                            next(err, null)
                                    })
                                })
                                .then((res: any) => { next(null, { result: 'Illustration created' }) })
                                .catch((err: any) => next(err, null))
                        }
                    })
                    .catch((err: any) => { next(err, null) })
            }
        }).catch((err: any) => { next(err, null) })
}



export const updateIllustrationFromOtherSource = (projectName: string, illustrationName: string, illustrationType: string, tags: string[], illustrationData: DOT | CalendarHeatmap | FLG | HEB | Sankey | Matrix | Timeline | any, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        Name: { $eq: illustrationName }
    };

    let update = { Name: illustrationName, Tags: tags, Data: illustrationData, Type: illustrationType }
    let ill: IllustrationUpdate = {
        projectName: projectName,
        name: illustrationName,
        tags: tags,
        data: illustrationData,
        type: illustrationType
    }
    return Promise.resolve()
        .then(() => { return illustrationValidator(ill) })
        .then((valid: boolean) => {
            if (valid) {
                _.assign(update, { LastModified: new Date() })
                return IllustrationTable
                    .findOneAndUpdate(query, update, { new: true })
                    .select('-_id')
                    .then((doc: any) => {

                        return Promise.resolve(doc)
                            .then((doc) => { next(null, doc) })
                    })
                    .catch((err: any) => next(err, null))
            }
        })
        .catch((err: any) => { next(err, null) })
}

export const findAllIllustration = (projectName: string, next: any) => {
    let query = { ProjectName: { $eq: projectName } }
    return Promise.resolve()
        .then(() => { return validateProjectNameAsString(projectName) })
        .then((valid: boolean) => {
            if (valid) {
                return IllustrationTable
                    .find(query)
                    .then((doc: any) => { next(null, doc); return doc })
                    .catch((err: any) => next(err, null))
            }
        })
        .catch((err: any) => { next(err, null) })
}

export const findOneIllustration = (projectName: string, illustrationNameFromReq: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        Name: { $eq: illustrationNameFromReq }
    };
    return Promise.resolve()
        .then(() => { return validateProjectNameAsString(projectName) })
        .then((valid: boolean) => {
            if (valid) {
                console.log(query)
                return IllustrationTable
                    .find(query)
                    .then((doc: any) => { console.log(doc); next(null, doc); return doc })
                    .catch((err: any) => next(err, null))
            }
        })
        .catch((err: any) => next(err, null))

}

export const deleteIllustration = (projectName: string, illustrationNameFromReq: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        Name: { $eq: illustrationNameFromReq }
    };
    return Promise.resolve()
        .then(() => { return validateProjectNameAndIllustrationNameAsString(projectName, illustrationNameFromReq) })
        .then((valid: boolean) => {
            if (valid) {
                return IllustrationTable
                    .deleteOne(query)
                    .then((doc: any) => {
                        return Promise.resolve(doc)
                            .then((doc) => { next(null, { IllustrationId: illustrationNameFromReq }) })
                            .catch((err: any) => next(err, null))
                    })
            }
        })
        .catch((err: any) => next(err, null))
}


export const getAllIllustriesOfTheSameType = (projectName: string, illustrationType: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        Type: { $eq: illustrationType }
    };
    return Promise.resolve()
        .then(() => { return validateProjectNameAndIllustrationTypeAsString(projectName, illustrationType) })
        .then((valid: boolean) => {
            if (valid) {
                return IllustrationTable
                    .find(query)
                    .then((doc: any) => { next(null, doc); return doc })
                    .catch((err: any) => next(err, null))
            }
        })
        .catch((err: any) => next(err, null))

}
