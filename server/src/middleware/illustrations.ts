import * as illustrationApi from '../api/illustrations'
import _ from 'lodash'
import * as helper from '../utils/helper'

 export const addIllustration = (req:any,res:any,next:any) => {
    let projectId = req.params.id
    let illustrationName = _.get(req, 'body.IllustrationName')
    let filePath = _.get(req, 'file.path')
    let fileType = _.get(req, 'file.mimetype')
    let illustrationType = _.get(req,'body.IllustrationType')
    if (_.isNil(filePath)) return helper.returnResponse(res, { name: 'invalidParam', message: "uploaded filepath is missing" }, null, next)
    let file = {
        filePath: filePath,
        type: fileType
    }
    illustrationApi.addIllustration(projectId, file, illustrationName,illustrationType,  (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }

 export const updateIllustration = (req:any,res:any,next:any) => {
    let projectId = req.params.prjid
    let illustrationId = req.params.id
    let illustrationName = _.get(req, 'body.IllustrationName')
    let filePath = _.get(req, 'file.path')
    let fileType = _.get(req, 'file.mimetype');
    let illustrationType = _.get(req,'body.IllustrationType')
    if (_.isNil(filePath)) return helper.returnResponse(res, { name: 'invalidParam', message: "uploaded filepath is missing" }, null, next)
    let file = {
        filePath: filePath,
        type: fileType
    }
    illustrationApi.updateIllustration(projectId, illustrationId, file, illustrationName,illustrationType, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }

 export const findAllIllustration = (req: any, res: any, next: any) => {
    let projectId = req.params.prjid
    illustrationApi.findAllIllustration(projectId, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }

export const findOneIllustration = (req: any, res: any, next: any) => {
    let projectId = req.params.prjid
    let illustrationId = req.params.id
    illustrationApi.findOneIllustration(projectId, illustrationId, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }

 export const deteleIllustration = (req: any, res: any, next: any) => {
    let projectId = req.params.prjid
    let illustrationId = req.params.id
    illustrationApi.deteleIllustration(projectId, illustrationId, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
 }