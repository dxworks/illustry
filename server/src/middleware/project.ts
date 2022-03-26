import * as projectApi from '../api/project'
import _ from 'lodash'
import * as helper from '../utils/helper'

export const createProjectfromExtern = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string;
    let projectDescription = req.body.description as string;
    let illustrationName = req.body.name as string;
    let illustrationType = req.body.type as string;
    let tags = req.body.tags as string[];
    let illustrationData = req.body.data as any;
    projectApi.createProjectfromExtern(projectName, projectDescription, illustrationName, illustrationType, tags, illustrationData, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}

export const deleteProjectfromExtern = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string;
    projectApi.deleteProject(projectName, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}

export const updateProjectfromEtern = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string;
    let projectDescription = req.body.description as string;
    projectApi.updateProjectfromEtern(projectName, projectDescription, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}

export const getOneProjectfromEtern = (req: any, res: any, next: any) => {
    let projectName = req.body.projectName as string;
    projectApi.getOneProjectfromEtern(projectName, (errGPC: any, data: any) => {

        helper.returnResponse(res, errGPC, data, next)
    })
}

export const createIllustryProject = (req: any, res: any, next: any) => {
    let projectName = req.body.name as string;
    let projectDescription = req.body.description as string;
    let files = _.get(req, 'files');
    // Validate file path
    if (_.isNil(files)) return helper.returnResponse(res, { name: 'invalidParam', message: "uploaded filepath is missing" }, null, next)
    let computedFiles = _.map(files, f => {
        return {
            filePath: _.get(f, 'path'),
            type: _.get(f, 'mimetype')
        }
    })
    let fields = {
        name: projectName,
        description: projectDescription,

    }
    projectApi.createIllustryProject(computedFiles, fields, (errGPC: any, data: any) => {

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
    let projectDescription = req.body.description as string;
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