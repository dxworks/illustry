
import ProjectTable from '../models/Project'
import _ from "lodash"
import { promisify } from 'bluebird';
import IllustrationTable from "../models/Illustrations"
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";
import { Promise } from 'bluebird'
export const addOrUpdateIllustrations = (projectName: string, files: FileProperties[], next: any) => {

    let query = { ProjectName: { $eq: projectName } };

    return readFile(files)
        .then((projectsJson: any) => {
            return ProjectTable.find(query)
                .cursor()
                .eachAsync((doc: any) => {
                    if (doc)
                        next(null, { result: 'Illustrations created' })
                    return Promise.map(projectsJson, projectJson => {
                        let illustrationModel = {
                            IllustrationData: _.get(projectJson, 'IllustrationData'),
                            ProjectName: doc.ProjectName,
                            IllustrationName: _.get(projectJson, 'IllustrationName'),
                            IllustrationType: _.get(projectJson, 'IllustrationType'),
                            ProjectId: doc._id,
                            Tags: _.get(projectJson, 'Tags')
                        }
                        return Promise.resolve(illustrationModel)
                            .then((illustrationModel) => {
                                return IllustrationTable.findOneAndUpdate({
                                    ProjectId: illustrationModel.ProjectId,
                                    ProjectName: illustrationModel.ProjectName,
                                    IllustrationName: illustrationModel.IllustrationName
                                }, illustrationModel, { upsert: true, new: true })
                                    .then((res: any) => {
                                    })
                            })
                            .catch((err: any) => next(err, null))
                    })
                })
        })
}
export const updateManyIllustration = (projectName: string, files: FileProperties[], next: any) => {

    let query = { ProjectName: { $eq: projectName } };
    return readFile(files)
        .then((projectsJson: any) => {
            return ProjectTable.find(query)
                .cursor()
                .eachAsync((doc: any) => {
                    if (doc)
                        next(null, { result: 'Illustrations created' })
                    return Promise.map(projectsJson, projectJson => {
                        let illustrationModel = {
                            IllustrationData: _.get(projectJson, 'IllustrationData'),
                            ProjectName: doc.ProjectName,
                            IllustrationName: _.get(projectJson, 'IllustrationName'),
                            IllustrationType: _.get(projectJson, 'IllustrationType'),
                            ProjectId: doc._id,
                            Tags: _.get(projectJson, 'Tags')
                        }
                        return Promise.resolve(illustrationModel)
                            .then((illustrationModel) => {
                                return IllustrationTable.findOneAndUpdate({ $and: [{ IllustrationName: illustrationModel.IllustrationName }, query] }, illustrationModel)
                                    .then(() => { next(null, "Illustrations updated successfull") })

                            })
                            .catch((err: any) => next(err, null))
                    })
                })
        })
}
export const addIllustrationFromOtherSource = (projectName: string, illustrationName: string, illustrationType: string, tags: string, illustrationData: any, next: any) => {
    let query = { ProjectName: { $eq: projectName } };

    return ProjectTable.find(query)
        .cursor()
        .eachAsync((doc: any) => {
            if (doc)
                next(null, { result: 'Illustration created' })
            let illustrationModel = {
                IllustrationData: illustrationData,
                ProjectName: doc.ProjectName,
                IllustrationName: illustrationName,
                IllustrationType: illustrationType,
                ProjectId: doc._id,
                Tags: tags
            }

            return Promise.resolve(illustrationModel)
                .then((res) => {
                    let illustrationTable = new IllustrationTable(res)
                    illustrationTable.save((err: any) => {
                        if (err)
                            next(err, null)
                    })
                })
                .catch((err: any) => next(err, null))
        })
}

export const updateIllustration = (projectName: string, illustrationNameFromReq: string, file: FileProperties, illustrationName: string, tags: string, next: any) => {

    let query = {
        ProjectName: { $eq: projectName },
        IllustrationName: { $eq: illustrationNameFromReq }
    };
    let update = { IllustrationName: illustrationName, Tags: tags }
    // return readfile(file)
    //     .then((projectJson) => {
    //         _.assign(update, { IllustrationData: _.get(projectJson, 'IllustrationData') })
    //         return IllustrationTable
    //             .findOneAndUpdate(query, update, { new: true })
    //             .select('-_id')
    //             .then((doc: any) => {
    //                 return Promise.resolve(doc)
    //                     .then((doc) => { next(null, doc) })
    //             })
    //             .catch((err: any) => next(err, null))
    //     })
}


export const updateIllustrationFromOtherSource = (projectName: string, illustrationName: string, illustrationType: string, tags: string[], illustrationData: any, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        IllustrationName: { $eq: illustrationName }
    };
    let update = { IllustrationName: illustrationName, Tags: tags, IllustrationData: illustrationData, IllustrationType: illustrationType }
    return IllustrationTable
        .findOneAndUpdate(query, update, { new: true })
        .select('-_id')
        .then((doc: any) => {
            return Promise.resolve(doc)
                .then((doc) => { next(null, doc) })
        })
        .catch((err: any) => next(err, null))
}

export const findAllIllustration = (projectName: string, next: any) => {
    let query = { ProjectName: { $eq: projectName } }

    return IllustrationTable
        .find(query)
        .then((doc: any) => { next(null, doc); return doc })
        .catch((err: any) => next(err, null))
}

export const findOneIllustration = (projectName: string, illustrationNameFromReq: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        IllustrationName: { $eq: illustrationNameFromReq }
    };

    return IllustrationTable
        .find(query)
        .cursor()
        .eachAsync((doc: any) => { next(null, doc); return doc })
        .catch((err: any) => next(err, null))
}

export const deleteIllustration = (projectName: string, illustrationNameFromReq: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        IllustrationName: { $eq: illustrationNameFromReq }
    };

    return IllustrationTable
        .deleteOne(query)
        .then((doc: any) => {
            return Promise.resolve(doc)
                .then((doc) => { next(null, { IllustrationId: illustrationNameFromReq }) })
                .catch((err: any) => next(err, null))
        })
        .catch((err: any) => next(err, null))
}


export const getAllIllustriesOfTheSameType = (projectName: string, illustrationType: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        IllustrationType: { $eq: illustrationType }
    };

    return IllustrationTable
        .find(query)
        .then((doc: any) => { next(null, doc); return doc })
        .catch((err: any) => next(err, null))
}
