
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

    let query = { ProjectName: { $eq: projectName } };

    return readFile(files)
        .then((projectsJson: any) => {
            return ProjectTable.find(query)
                .cursor()
                .eachAsync((doc: any) => {

                    if (doc)
                        return Promise.map(projectsJson, projectJson => {
                            let illustrationModel: Illustration = {
                                IllustrationData: _.get(projectJson, 'IllustrationData'),
                                ProjectName: doc.ProjectName,
                                IllustrationName: _.get(projectJson, 'IllustrationName'),
                                IllustrationType: _.get(projectJson, 'IllustrationType'),
                                ProjectId: doc._id,

                                Tags: _.get(projectJson, 'Tags')
                            }
                            if (illustrationValidator(illustrationModel)) {
                                return Promise.resolve(illustrationModel)
                                    .then((illustrationModel) => {
                                        return IllustrationTable.findOneAndUpdate({
                                            ProjectId: illustrationModel.ProjectId,
                                            ProjectName: illustrationModel.ProjectName,
                                            IllustrationName: illustrationModel.IllustrationName,
                                        }, illustrationModel, { upsert: true, new: true })
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
                                    })
                                    .catch((err: any) => next(err, null))
                            }
                        }).catch((err: any) => next(err, null))
                })
        })
}

export const addIllustrationFromOtherSource = (projectName: string, illustrationName: string, illustrationType: string, tags: string[], illustrationData: DOT | CalendarHeatmap | FLG | HEB | Sankey | Matrix | Timeline | any, next: any) => {
    let query = { ProjectName: { $eq: projectName } };

    return ProjectTable.find(query)
        .cursor()
        .eachAsync((doc: any) => {
            if (doc) {
                const illustrationModel: Illustration = {
                    IllustrationData: illustrationData,
                    ProjectName: doc.ProjectName,
                    IllustrationName: illustrationName,
                    IllustrationType: illustrationType,
                    ProjectId: doc._id,
                    Tags: tags
                }
                return Promise.resolve()
                    .then(() => { return illustrationValidator(illustrationModel) })
                    .then((valid: boolean) => {
                        if (valid) {
                            return Promise.resolve(illustrationModel)
                                .then((res) => {
                                    _.assign(res, { CreatedAt: new Date() })
                                    _.assign(res, { LastModified: new Date() })
                                    let illustrationTable = new IllustrationTable(res)
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
        IllustrationName: { $eq: illustrationName }
    };

    let update = { IllustrationName: illustrationName, Tags: tags, IllustrationData: illustrationData, IllustrationType: illustrationType }
    let ill: IllustrationUpdate = {
        ProjectName: projectName,
        IllustrationName: illustrationName,
        Tags: tags,
        IllustrationData: illustrationData,
        IllustrationType: illustrationType
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
        IllustrationName: { $eq: illustrationNameFromReq }
    };
    return Promise.resolve()
        .then(() => { return validateProjectNameAsString(projectName) })
        .then((valid: boolean) => {
            if (valid) {
                return IllustrationTable
                    .find(query)
                    .cursor()
                    .eachAsync((doc: any) => { next(null, doc); return doc })
                    .catch((err: any) => next(err, null))
            }
        })
        .catch((err: any) => next(err, null))

}

export const deleteIllustration = (projectName: string, illustrationNameFromReq: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        IllustrationName: { $eq: illustrationNameFromReq }
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
        IllustrationType: { $eq: illustrationType }
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
