import * as timelineApi from '../api/timelineCompute'
import * as helper from '../utils/helper'

import _ from 'lodash'


export const checkSearch = (req: any, res: any, next: any) => {
    let projectName = req.body.ProjectName
    let illustrationName = req.body.IllustrationName
    let searchedText = req.body.searchedText
    let fromDate = req.body.fromDate
    let toDate = req.body.toDate
    return timelinerApi.checkSearch(projectName, illustrationName, searchedText, fromDate, toDate, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}
