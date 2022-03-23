import * as illustrationLib from '../lib/illustrations'
import { FileProperties } from '../types/fileproperties'
import { DOT, CalendarHeatmap, FLG, HEB, Sankey, Matrix, Timeline } from '../types/illustrations.'

export function addOrUpdateIllustrations(projectName: string, files: FileProperties[], next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.addOrUpdateIllustrations(projectName, files, next) })
}
// export function updateManyIllustration(projectName: string, files: FileProperties[], next: any) {
//     return Promise.resolve()
//         .then(() => { return illustrationLib.updateManyIllustration(projectName, files, next) })
// }

// export function updateIllustration(projectName: string, illustrationNameFromReq: string, file: FileProperties, illustrationName: string, tags: string, next: any) {
//     return Promise.resolve()
//         .then(() => { return illustrationLib.updateIllustration(projectName, illustrationNameFromReq, file, illustrationName, tags, next) })
// }

export function findAllIllustration(projectName: string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.findAllIllustration(projectName, next) })
}

export function findOneIllustration(projectName: string, illustrationNameFromReq: string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.findOneIllustration(projectName, illustrationNameFromReq, next) })
}

export function deteleIllustration(projectName: string, illustrationNameFromReq: string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.deleteIllustration(projectName, illustrationNameFromReq, next) })
}


export function updateIllustrationFromOtherSource(projectName: any, illustrationName: any, illustrationType: any, tags: any, illustrationData: any, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.updateIllustrationFromOtherSource(projectName, illustrationName, illustrationType, tags, illustrationData, next) })
}
export function addIllustrationFromOtherSource(projectName: string, illustrationName: string, illustrationType: string, tags: string[], illustrationData: DOT | CalendarHeatmap | FLG | HEB | Sankey | Matrix | Timeline | any, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.addIllustrationFromOtherSource(projectName, illustrationName, illustrationType, tags, illustrationData, next) })
}

export function getAllIllustriesOfTheSameType(projectName: string, illustrationType: string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.getAllIllustriesOfTheSameType(projectName, illustrationType, next) })
}