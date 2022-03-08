import * as timelineLib from '../lib/timelineCompute'

export const checkSearch = (projectName: string, illustrationName: string, searchedTerm: string, fromDate: string, toDate: string, next: any) => {
    return timelineLib.checkSearch(projectName, illustrationName, searchedTerm, fromDate, toDate, next)
}