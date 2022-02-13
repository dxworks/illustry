
import ProjectTable from '../models/Project'
import _ from "lodash"
import { promisify } from 'bluebird';
import IllustrationTable from "../models/Illustrations"
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";

export const addIllustration = (projectName: string, file: FileProperties, illustrationName: string, illustrationType: string, tags: string, next: any) => {

    let query = { ProjectName: { $eq: projectName } };

    return promisify(readFile)(file, { ProjectDescription: "", ProjectName: "" })
        .then((projectJson) => {
            return ProjectTable.find(query)
                .cursor()
                .eachAsync((doc: any) => {
                    if (doc)
                        next(null, { result: 'Illustration created' })
                    let illustrationModel = {
                        IllustrationData: _.get(projectJson, 'IllustrationData'),
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
    return promisify(readFile)(file, { ProjectDescription: "", ProjectName: "" })
        .then((projectJson) => {
            _.assign(update, { IllustrationData: _.get(projectJson, 'IllustrationData') })
            return IllustrationTable
                .findOneAndUpdate(query, update, { new: true })
                .select('-_id')
                .then((doc: any) => {
                    return Promise.resolve(doc)
                        .then((doc) => { next(null, doc) })
                })
                .catch((err: any) => next(err, null))
        })
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
