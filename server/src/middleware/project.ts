import * as projectApi from '../api/project'
import _ from 'lodash'
import * as helper from '../utils/helper'

export const createGitProject = (req: any, res: any, next: any) => {
    projectApi.createGitProject(req.body, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}


export const createIllustryProject = (req: any, res: any, next: any) => {
    let projectName = _.get(req, 'body.ProjectName')
    let filePath = _.get(req, 'file.path')
    let fileType = _.get(req, 'file.mimetype')
    let projectDescription = _.get(req, 'body.ProjectDescription')
    let illustrationName = _.get(req, 'body.IllustrationName')
    let illustrationType = _.get(req, 'body.IllustrationType')
    let tags = _.get(req, 'body.Tags')
    // Validate file path
    if (_.isNil(filePath)) return helper.returnResponse(res, { name: 'invalidParam', message: "uploaded filepath is missing" }, null, next)
    let file = {
        filePath: filePath,
        type: fileType
    }
    let fields = {
        ProjectName: projectName,
        ProjectDescription: projectDescription,
        IllustrationName: illustrationName,
        IllustrationType: illustrationType,
        Tags: tags
    }
    projectApi.createIllustryProject(file, fields, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}

export const query = (req: any, res: any, next: any) => {
    projectApi.queryAllProjects((err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const findOne = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    {
        projectApi.findOneProject(projectName, (err: any, data: any) => {
            helper.returnResponse(res, err, data, next)
        })
    }
}

export const updateProject = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    console.log(projectName)
    let projectDescription = _.get(req, 'body.ProjectDescription')

    {
        projectApi.updateProject(projectName, projectDescription, (err: any, data: any) => {
            helper.returnResponse(res, err, data, next)
        })
    }
}

export const deleteProject = (req: any, res: any, next: any) => {
    let projectName = req.params.projectName
    {
        projectApi.deleteProject(projectName, (err: any, data: any) => {
            helper.returnResponse(res, err, data, next)
        })
    }
}