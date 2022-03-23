import * as timelineApi from '../api/timelineCompute'
import * as helper from '../utils/helper'

export const checkSearch = (req: any, res: any, next: any) => {
    let projectName = req.body.ProjectName
    let illustrationName = req.body.IllustrationName
    let searchedText = req.body.searchedText
    let fromDate = req.body.fromDate
    let toDate = req.body.toDate
    return timelineApi.checkSearch(projectName, illustrationName, searchedText, fromDate, toDate, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}
