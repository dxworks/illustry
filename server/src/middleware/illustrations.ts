import * as illustrationApi from '../api/illustrations'
import _ from 'lodash'
import * as helper from '../utils/helper'

export const addOrUpdateIllustrations = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName

    let files = _.get(req, 'files.File');
    if (_.isNil(files)) return helper.returnResponse(res, { name: 'invalidParam', message: "No files uploaded" }, null, next)
    let computedFiles = _.map(files, f => {
        return {
            filePath: _.get(f, 'path'),
            type: _.get(f, 'mimetype')
        }
    })
    illustrationApi.addOrUpdateIllustrations(projectName, computedFiles, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const addIllustrationFromOtherSource = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string
    let illustrationName = req.body.name as string
    let illustrationType = req.body.type as string
    let tags = req.body.tags as string[]
    let illustrationData = req.body.data as any
    illustrationApi.addIllustrationFromOtherSource(projectName, illustrationName, illustrationType, tags, illustrationData, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const updateIllustrationFromOtherSource = (req: any, res: any, next: any) => {

    let projectName = req.body.projectName as string

    let illustrationName = req.body.name as string
    let illustrationType = req.body.type as string
    let tags = req.body.tags as string[]
    let illustrationData = req.body.data as any
    illustrationApi.updateIllustrationFromOtherSource(projectName, illustrationName, illustrationType, tags, illustrationData, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}



export const findAllIllustration = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    illustrationApi.findAllIllustration(projectName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const findAllIllustrationFromOtherSource = (req: any, res: any, next: any) => {
    let projectName = req.body.name as string

    illustrationApi.findAllIllustration(projectName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}



export const findOneIllustration = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    let illustrationNameFromReq = req.params.illustrationName

    illustrationApi.findOneIllustration(projectName, illustrationNameFromReq, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const findOneIllustrationFromOtherSource = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string
    let illustrationNameFromReq = req.body.name as string
    illustrationApi.findOneIllustration(projectName, illustrationNameFromReq, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const deteleIllustration = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    let illustrationNameFromReq = req.params.illustrationName
    illustrationApi.deteleIllustration(projectName, illustrationNameFromReq, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const deleteIllustrationFromExternalSource = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string
    let illustrationName = req.body.name as string
    illustrationApi.deteleIllustration(projectName, illustrationName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}
export const getAllIllustriesOfTheSameType = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    let illustrationType = req.params.type
    illustrationApi.getAllIllustriesOfTheSameType(projectName, illustrationType, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const getAllIllustriesOfTheSameTypeFromOtherSource = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string
    let illustrationType = req.body.type as string
    illustrationApi.getAllIllustriesOfTheSameType(projectName, illustrationType, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}
