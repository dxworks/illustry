
import ProjectTable from "../models/Project"
import _ from "lodash"
import { promisify } from 'bluebird';
import IllustrationTable from "../models/Illustrations"
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";

export const addIllustration = (projectId: string, file: FileProperties, illustrationName: string,illustrationType:string, next: any) => {

    let query = { _id: { $eq: projectId } };

    return promisify(readFile)(file, {})
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
                        ProjectId: doc._id
                    }

                    return Promise.resolve(illustrationModel)
                        .then((res) => {
                            let illustrationTable = new IllustrationTable(res)
                            illustrationTable.save((err: any) => {
                                if (err)
                                    next(err,null)
                            })
                        })
                        .catch((err: any) => next(err,null))
                })
        })
}

export const updateIllustration = (projectId: string, illustrationId: string, file: FileProperties, illustrationName: string,illustrationType:string, next: any) => {

    let query = {
        _id: { $eq: illustrationId },
        ProjectId: { $eq: projectId }
    };
    let update = { IllustrationName: illustrationName }
    return promisify(readFile)(file, {})
        .then((projectJson) => {
            _.assign(update, { IllustrationData: _.get(projectJson,'IllustrationData') }) 
            return IllustrationTable
                .findOneAndUpdate(query, update, { new: true })
                .select('-_id')
                .then((doc: any) => {
                    return Promise.resolve(doc)
                        .then((doc) => { next(null, doc) })
                })
                .catch((err: any) => next(err,null))
        })
}

export const findAllIllustration = (projectId: string, next: any) => {
    let query = { ProjectId: { $eq: projectId } }

    return IllustrationTable
        .find(query)
        .then((doc: any) => { next(null, doc); return doc })
        .catch((err: any) => next(err,null))
}

export const findOneIllustration = (projectId: string, illustrationId: string, next: any) => {
    let query = {
        _id: { $eq: illustrationId },
        ProjectId: { $eq: projectId }
    };

    return IllustrationTable
        .find(query)
        .cursor()
        .eachAsync((doc: any) => { next(null, doc); return doc })
        .catch((err: any) => next(err,null))
}

export const deleteIllustration = (projectId: string, illustrationId: string, next: any) => {
    let query = {
        _id: { $eq: illustrationId },
        ProjectId: { $eq: projectId }
    };

    return IllustrationTable
    .deleteOne(query)
    .then((doc: any) => {
        return Promise.resolve(doc)
            .then((doc) => { next(null, { IllustrationId: illustrationId }) })
            .catch((err: any) => next(err,null))
    })
    .catch((err: any) => next(err,null))
}


