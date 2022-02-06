import * as timelinerLib from '../lib/timelinerCompute'

export const checkSearch = (projectName: string, illustrationName: string, searchedTerm: string, fromDate: string, toDate: string, next: any) => {
    return timelinerLib.checkSearch(projectName, illustrationName, searchedTerm, fromDate, toDate, next)
}