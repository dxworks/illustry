
import { Factory } from "../bzl/factory";
import _ from "lodash";
import * as helper from "../utils/helper";
import { IllustrationTypes } from "types/illustrations";

export const createProjectfromExtern = (req: any, res: any, next: any) => {
  let projectName = req.body.projectName as string;
  let projectDescription = req.body.projectDescription as string;
  let illustrationName = req.body.name as string;
  let illustrationType = req.body.type as
    | IllustrationTypes
    | IllustrationTypes[];
  let illustrationDescription = req.body.description as string;
  let tags = req.body.tags as string[];
  let illustrationData = req.body.data as any;
  return Factory.getInstance().api.projectApi.createProjectfromExtern(
    projectName,
    projectDescription,
    illustrationName,
    illustrationType,
    illustrationDescription,
    tags,
    illustrationData)
    .asCallback((errGPC:any, data:any) => {
    
      return helper.returnResponse(res, errGPC, data, next);
    })
};

export const deleteProjectfromExtern = (req: any, res: any, next: any) => {
  let projectName = req.body.projectName as string;
  Factory.getInstance().api.projectApi.deleteProject(projectName)
  .asCallback((errGPC:any, data:any) => {
    helper.returnResponse(res, errGPC, data, next);
  });
};

export const updateProjectfromEtern = (req: any, res: any, next: any) => {
  let projectName = req.body.projectName as string;
  let projectDescription = req.body.description as string;
  Factory.getInstance().api.projectApi.updateProjectfromEtern(
    projectName,
    projectDescription)
    .asCallback((errGPC:any, data:any) => {
      helper.returnResponse(res, errGPC, data, next);
    }
  );
};

export const getOneProjectfromEtern = (req: any, res: any, next: any) => {
  let projectName = req.body.projectName as string;
  Factory.getInstance().api.projectApi.getOneProjectfromEtern(projectName)
  .asCallback((errGPC:any, data:any) => {
    helper.returnResponse(res, errGPC, data, next);
  });
};

export const createIllustryProject = (req: any, res: any, next: any) => {
  let projectName = req.body.name as string;
  let projectDescription = req.body.description as string;
  let files = _.get(req, "files");
  // Validate file path
  if (_.isNil(files))
    return helper.returnResponse(
      res,
      { name: "invalidParam", message: "uploaded filepath is missing" },
      null,
      next
    );
  let computedFiles = _.map(files, (f) => {
    return {
      filePath: _.get(f, "path"),
      type: _.get(f, "mimetype"),
    };
  });
  let fields = {
    name: projectName,
    description: projectDescription,
  };
  Factory.getInstance().api.projectApi.createIllustryProject(
    computedFiles,
    fields)
    .asCallback((errGPC:any, data:any) => {
      helper.returnResponse(res, errGPC, data, next);
    }
  );
};

export const query = (req: any, res: any, next: any) => {
 return Factory.getInstance().api.projectApi.queryAllProjects()
  .asCallback((err: any, data: any) => {
    helper.returnResponse(res, err, data, next);
  })
};

export const findOne = (req: any, res: any, next: any) => {
  let projectName = req.params.projectName;
  {
  return  Factory.getInstance().api.projectApi.findOneProject(projectName)
  .asCallback((err:any, data:any) => {
      helper.returnResponse(res, err, data, next);
    });
  }
};

export const updateProject = (req: any, res: any, next: any) => {
  let projectName = req.params.projectName;
  let projectDescription = req.body.description as string;
  {
    Factory.getInstance().api.projectApi.updateProject(
      projectName,
      projectDescription)
      .asCallback((err:any, data:any) => {
        helper.returnResponse(res, err, data, next);
      }
    );
  }
};

export const deleteProject = (req: any, res: any, next: any) => {
  let projectName = req.params.projectName;
  {
    Factory.getInstance().api.projectApi.deleteProject(projectName)
    .asCallback((err:any, data:any) => {
      helper.returnResponse(res, err, data, next);
    });
  }
};