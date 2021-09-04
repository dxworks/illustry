import * as illustrationLib from '../lib/illustrations'
import { FileProperties } from '../types/fileproperties'
import { Illustration } from '../types/illustrations.'

export function addIllustration(projectName: string, file: FileProperties, illustrationName: string,illustrationType: string,tags:string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.addIllustration(projectName, file, illustrationName,illustrationType,tags, next) })
}

export function updateIllustration(projectName: string, illustrationNameFromReq: string, file: FileProperties, illustrationName: string, tags:string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.updateIllustration(projectName,illustrationNameFromReq, file, illustrationName,tags, next) })
}

export function findAllIllustration(projectName: string, next: any) {
    return Promise.resolve()
        .then(() => {  return illustrationLib.findAllIllustration(projectName, next) })
}

export function findOneIllustration(projectName: string, illustrationNameFromReq: string, next: any) {
    return Promise.resolve()
        .then(() => {  return illustrationLib.findOneIllustration(projectName, illustrationNameFromReq, next) })
}

export function deteleIllustration(projectName: string, illustrationNameFromReq: string, next: any) {
    return Promise.resolve()
        .then(() => {  return illustrationLib.deleteIllustration(projectName, illustrationNameFromReq, next) })
}

export function addIllustrationFromOtherSource(projectName: string, illustrationName: string, illustrationType: string, tags: string, illustrationData: Illustration, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.addIllustrationFromOtherSource(projectName, illustrationName, illustrationType, tags, illustrationData, next)})
}

export function getAllIllustriesOfTheSameType(projectName: string, illustrationType: string, next:any) {
    return Promise.resolve()
        .then(() => {  return illustrationLib.getAllIllustriesOfTheSameType(projectName,illustrationType,next)})
}