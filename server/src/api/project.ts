
import { Factory } from "../lib/factory";
import _ from "lodash";
import * as helper from "../utils/helper";
import { IllustrationTypes } from "types/illustrations";
import { Illustration, Project } from "index";
import { validateProject, validateProjectNameAsString, validateProjectNameAsStringAndProjectDescriptionAsString } from "../validator/projectValidator";

export const createExtern = (req: any, res: any, next: any) => {
  const project: Project = {
    name: req.body.projectName as string,
    description: req.body.projectDescription as string
  }
  const illustration: Illustration = {
    projectName: req.body.projectName as string,
    name: req.body.name as string,
    type: req.body.type as
      | IllustrationTypes
      | IllustrationTypes[],
    description: req.body.description as string,
    tags: req.body.tags as string[],
    data: req.body.data as any
  }
  return Promise.resolve(validateProject(project, illustration))
    .then(valid => {
      if (valid) {
        return Factory.getInstance().BZL.projectApi.createExtern(
          project,
          illustration)
          .asCallback((errGPC: any, data: any) => {

            return helper.returnResponse(res, errGPC, data, next);
          })
      }
    })
    .catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    });
};

export const deleteExtern = (req: any, res: any, next: any) => {
  let projectName: string = req.body.projectName as string;
  return Promise.resolve(validateProjectNameAsString(projectName))
    .then(valid => {
      if (valid) {
        return Factory.getInstance().BZL.projectApi.delete(projectName)
          .asCallback((errGPC: any, data: any) => {
            helper.returnResponse(res, errGPC, data, next);
          })
      }
    })
    .catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    });
};

export const updateExtern = (req: any, res: any, next: any) => {
  let projectName: string = req.body.projectName as string;
  let projectDescription: string = req.body.description as string;
  return Promise.resolve(validateProjectNameAsStringAndProjectDescriptionAsString(projectName, projectDescription))
    .then(valid => {
      if (valid) {
        return Factory.getInstance().BZL.projectApi.update(
          projectName,
          projectDescription)
          .asCallback((errGPC: any, data: any) => {
            helper.returnResponse(res, errGPC, data, next);
          })
      }
    })
    .catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    });
};

export const findOneExtern = (req: any, res: any, next: any) => {
  let projectName: string = req.body.projectName as string;
  return Promise.resolve(validateProjectNameAsString(projectName))
    .then(valid => {
      if (valid) {
        return Factory.getInstance().BZL.projectApi.findOne(projectName)
          .asCallback((errGPC: any, data: any) => {
            helper.returnResponse(res, errGPC, data, next);
          });
      };
    }).catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    });
}

export const create = (req: any, res: any, next: any) => {
  const project: Project = {
    name: req.body.name as string,
    description: req.body.description as string
  }
  return Promise.resolve(validateProjectNameAsStringAndProjectDescriptionAsString(project.name, project.description as unknown as string))
    .then(valid => {
      if (valid) {

        return Factory.getInstance().BZL.projectApi.create(project)
          .asCallback((errGPC: any, data: any) => {
            helper.returnResponse(res, errGPC, data, next);
          }
          );
      };
    })
    .catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    })
}
export const browse = (req: any, res: any, next: any) => {
  return Factory.getInstance().BZL.projectApi.browse()
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    })
};

export const findOne = (req: any, res: any, next: any) => {
  let projectName: string = req.params.projectName as string;
  return Promise.resolve(validateProjectNameAsString(projectName))
    .then(valid => {
      if (valid) {
        return Factory.getInstance().BZL.projectApi.findOne(projectName)
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
      };
    })
    .catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    })
}
export const update = (req: any, res: any, next: any) => {
  let projectName: string = req.params.projectName as string;
  let projectDescription: string = req.body.description as string;
  return Promise.resolve(validateProjectNameAsStringAndProjectDescriptionAsString(projectName, projectDescription))
    .then(valid => {
      if (valid) {
        return Factory.getInstance().BZL.projectApi.update(
          projectName,
          projectDescription)
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          }
          );
      }
    }).catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    })
};

export const _delete = (req: any, res: any, next: any) => {
  let projectName: string = req.params.projectName;
  return Promise.resolve(validateProjectNameAsString(projectName))
    .then(valid => {
      if (valid) {
        return Factory.getInstance().BZL.projectApi.delete(projectName)
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
      }
    }).catch(err => {
      return helper.returnResponse(
        res,
        err,
        null,
        next
      );
    })
};