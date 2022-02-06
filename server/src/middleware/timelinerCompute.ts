import * as timelinerApi from '../api/timelinerCompute'
import * as helper from '../utils/helper'

import _ from 'lodash'


export const checkSearch = (req: any, res: any, next: any) => {
    let projectName = _.get(req, 'body.ProjectName')
    let illustrationName = _.get(req, 'body.IllustrationName')
    let searchedText = _.get(req, 'body.searchedText')
    let fromDate = _.get(req, 'body.fromDate')
    let toDate = _.get(req, 'body.toDate')
    return timelinerApi.checkSearch(projectName, illustrationName, searchedText, fromDate, toDate, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}
