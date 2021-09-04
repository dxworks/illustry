import * as illustrationLib from '../lib/illustrations'
import { FileProperties } from '../types/fileproperties'

export function addIllustration(projectId: string, file: FileProperties, illustrationName: string,illustrationType: string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.addIllustration(projectId, file, illustrationName,illustrationType, next) })
}

export function updateIllustration(projectId: string, illustrationId: string, file: FileProperties, illustrationName: string,illustrationType:string, next: any) {
    return Promise.resolve()
        .then(() => { return illustrationLib.updateIllustration(projectId,illustrationId, file, illustrationName,illustrationType, next) })
}

export function findAllIllustration(projectId: string, next: any) {
    return Promise.resolve()
        .then(() => {  return illustrationLib.findAllIllustration(projectId, next) })
}

export function findOneIllustration(projectId: string, illustrationId: string, next: any) {
    return Promise.resolve()
        .then(() => {  return illustrationLib.findOneIllustration(projectId, illustrationId, next) })
}

export function deteleIllustration(projectId: string, illustrationId: string, next: any) {
    return Promise.resolve()
        .then(() => {  return illustrationLib.deleteIllustration(projectId, illustrationId, next) })
}