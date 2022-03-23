import * as projectLib from '../lib/project'
import { FileProperties } from '../types/fileproperties'
import { Project } from '../types/project'


export function createProjectfromExtern(projectName: string, projectDescription: string, illustrationName: string, illustrationType: string, tags: string[], illustrationData: any, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.createProjectfromExtern(projectName, projectDescription, illustrationName, illustrationType, tags, illustrationData, next) })
}



export function updateProjectfromEtern(projectName: string, projectDescription: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.updateProjectfromEtern(projectName, projectDescription, next) })
}

export function getOneProjectfromEtern(projectName: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.getOneProjectfromEtern(projectName, next) })
}

export function createIllustryProject(files: FileProperties[], project: Project, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.createIllustryProject(files, project, next) })
}


export function findOneProject(projectName: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.findOneProject(projectName, next) })
}

export function queryAllProjects(next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.queryAllProjects(next) })
}


export function updateProject(projectName: string, projectDescription: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.updateProject(projectName, projectDescription, next) })
}

export function deleteProject(projectName: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.deleteProject(projectName, next) })
}