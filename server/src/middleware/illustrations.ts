import * as illustrationApi from '../api/illustrations'
import _ from 'lodash'
import * as helper from '../utils/helper'

 export const addIllustration = (req:any,res:any,next:any) => {
    let projectName = req.params.projectName
    let illustrationName = _.get(req, 'body.IllustrationName')
    let filePath = _.get(req, 'file.path')
    let fileType = _.get(req, 'file.mimetype')
    let illustrationType = _.get(req,'body.IllustrationType')
    let tags = _.get(req,'body.Tags')
    if (_.isNil(filePath)) return helper.returnResponse(res, { name: 'invalidParam', message: "uploaded filepath is missing" }, null, next)
    let file = {
        filePath: filePath,
        type: fileType
    }
    illustrationApi.addIllustration(projectName, file, illustrationName,illustrationType,tags,  (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }

 export const addIllustrationFromOtherSource = (req:any, res:any, next:any) => {
     let projectName = req.params.projectName
     let illustrationName =  _.get(req, 'body.IllustrationName')
     let illustrationType = _.get(req,'body.IllustrationType')
     let tags = _.get(req,'body.Tags')
     let illustrationData = _.get(req, 'body.IllustrationData')
     illustrationApi.addIllustrationFromOtherSource(projectName,illustrationName,illustrationType,tags,illustrationData,(err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}
 export const updateIllustration = (req:any,res:any,next:any) => {
    let projectName = req.params.projectName
    let illustrationNameFromReq = req.params.illustrationName
    let illustrationName = _.get(req, 'body.IllustrationName')
    let filePath = _.get(req, 'file.path')
    let fileType = _.get(req, 'file.mimetype');
    let tags = _.get(req,'body.Tags')
    if (_.isNil(filePath)) return helper.returnResponse(res, { name: 'invalidParam', message: "uploaded filepath is missing" }, null, next)
    let file = {
        filePath: filePath,
        type: fileType
    }
    illustrationApi.updateIllustration(projectName, illustrationNameFromReq, file, illustrationName,tags, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }

 export const findAllIllustration = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
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

 export const deteleIllustration = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    let illustrationNameFromReq = req.params.illustrationName
    illustrationApi.deteleIllustration(projectName, illustrationNameFromReq, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }

 export const getAllIllustriesOfTheSameType = (req:any, res: any, next: any) => {
    let projectName = req.params.projectName
    let illustrationType = req.params.illustrationType
    illustrationApi.getAllIllustriesOfTheSameType(projectName,illustrationType, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }