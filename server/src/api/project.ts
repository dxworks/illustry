import * as projectLib from '../lib/project'
import { FileProperties } from '../types/fileproperties'
import { Project } from '../types/project'


export function createGitProject(project: any, next: any) {
    return Promise.resolve()
    .then(() => { return projectLib.createGitProject(project, next) })
}

export function createIllustryProject(file: FileProperties, project: Project, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.createIllustryProject(file, project, next) })
}

export function findOneProject(id: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.findOneProject(id, next) })
}

export function queryAllProjects(next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.queryAllProjects(next) })
}

export function updateProject(id: string, projectDescription: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.updateProject(id, projectDescription, next) })
}

export function deleteProject(id: string, next: any) {
    return Promise.resolve()
        .then(() => { return projectLib.deleteProject(id, next) })
}