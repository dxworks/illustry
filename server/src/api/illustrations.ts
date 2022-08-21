
import { Factory } from "../lib/factory";
import _ from "lodash";
import * as helper from "../utils/helper";
import { IllustrationTypes } from "types/illustrations";
import { illustrationValidator, validateFilesFormatWithSelectedType, validateProjectNameAndIllustratioNameAndIllustrationTypeAsString, validateProjectNameAndIllustrationNameAsString, validateProjectNameAndIllustrationTypeAsString } from "../validator/illustrationValidator";
import { FileProperties, Illustration } from "index";
import { validateProjectNameAsString } from "../validator/projectValidator";

export const addOrUpdate = (req: any, res: any, next: any) => {
  const projectName: string = req.params.projectName as string;
  const format: string = req.body.format as string;

  const files = _.get(req, "files.File");
  if (_.isNil(files))
    return helper.returnResponse(
      res,
      { name: "invalidParam", message: "No files uploaded" },
      null,
      next
    );
  const computedFiles: FileProperties[] = _.map(files, (f) => {
    return {
      filePath: _.get(f, "path"),
      type: _.get(f, "mimetype"),
    };
  });
  return Promise.resolve(validateFilesFormatWithSelectedType(format, computedFiles))
    .then(valid => {
      if (valid) {
        if (format === 'JSON') {
          return Factory.getInstance()
            .BZL.illustrationApi.addOrUpdateJSON(projectName, computedFiles)
            .asCallback((err: any, data: any) => {
              helper.returnResponse(res, err, data, next);
            })
        }

        else {
          if (format === 'CSV') {
            const illustration: Illustration = {
              name: req.body.illustrationName as string,
              description: req.body.illustrationDescription as string,
              type: req.body.illustrationType.split(',') as IllustrationTypes[],
              projectName: projectName,
              data: {}
            }

            if (typeof req.body.tags === "string") {
              _.set(illustration, 'tags', req.body.tags.split(','))
            }
            else {
              _.set(illustration, 'tags', req.body.tags)
            }
            const separator: string = req.body.separator
            return Factory.getInstance()
              .BZL.illustrationApi.addOrUpdateCSV(illustration, separator, computedFiles)
              .asCallback((err: any, data: any) => {
                helper.returnResponse(res, err, data, next);
              })
          }
        }
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
}

export const addExtern = (
  req: any,
  res: any,
  next: any
) => {
  const illustrationModel: Illustration = {
    data: req.body.data as any,
    projectName: req.body.projectName as string,
    description: req.body.description as string,
    name: req.body.name as string,
    type: req.body.type as
      | IllustrationTypes
      | IllustrationTypes[],
    tags: req.body.tags as string[],
  };
  return Promise.resolve(illustrationValidator(illustrationModel))
    .then((valid) => {
      if (valid) {
        Factory.getInstance()
          .BZL.illustrationApi.addExtern(
            illustrationModel
          )
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const updateExtern = (
  req: any,
  res: any,
  next: any
) => {
  const illustrationModel: Illustration = {
    data: req.body.data as any,
    projectName: req.body.projectName as string,
    description: req.body.description as string,
    name: req.body.name as string,
    type: req.body.type as
      | IllustrationTypes
      | IllustrationTypes[],
    tags: req.body.tags as string[],
  };
  return Promise.resolve(illustrationValidator(illustrationModel))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi.updateExtern(
            illustrationModel
          )
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const browse = (req: any, res: any, next: any) => {
  const projectName: string = req.params.projectName as string;
  return Promise.resolve(validateProjectNameAsString(projectName))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi.browse(projectName)
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const browseExtern = (
  req: any,
  res: any,
  next: any
) => {
  const projectName: string = req.body.name as string;
  return Promise.resolve(validateProjectNameAsString(projectName))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi.browse(projectName)
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const findOne = (req: any, res: any, next: any) => {
  const projectName: string = req.params.projectName as string;
  const illustrationName: string = req.params.illustrationName as string;
  return Promise.resolve(validateProjectNameAndIllustrationNameAsString(projectName, illustrationName))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi.findOne(
            projectName,
            illustrationName
          )
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const findOneExtern = (
  req: any,
  res: any,
  next: any
) => {
  const projectName: string = req.body.projectName as string;
  const illustrationName: string = req.body.name as string;
  return Promise.resolve(validateProjectNameAndIllustrationNameAsString(projectName, illustrationName))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi.findOne(
            projectName,
            illustrationName
          )
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const _delete = (req: any, res: any, next: any) => {
  const projectName: string = req.params.projectName as string;
  const illustrationName: string = req.params.illustrationName as string;
  const illustrationType: IllustrationTypes = req.params.type as IllustrationTypes
  return Promise.resolve(validateProjectNameAndIllustratioNameAndIllustrationTypeAsString(projectName, illustrationName, illustrationType))
    .then((valid) => {
      if (valid) {

        return Factory.getInstance()
          .BZL.illustrationApi._delete(
            projectName,
            illustrationName,
            illustrationType
          )
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const deleteExtern = (
  req: any,
  res: any,
  next: any
) => {
  const projectName: string = req.body.projectName as string;
  const illustrationName: string = req.body.name as string;
  const illustrationType: IllustrationTypes = req.params.type as IllustrationTypes
  return Promise.resolve(validateProjectNameAndIllustratioNameAndIllustrationTypeAsString(projectName, illustrationName, illustrationType))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi._delete(projectName, illustrationName, illustrationType)
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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
export const browseSameType = (
  req: any,
  res: any,
  next: any
) => {
  const projectName: string = req.body.projectName as string;
  const illustrationType: IllustrationTypes = req.params.type as IllustrationTypes
  return Promise.resolve(validateProjectNameAndIllustrationTypeAsString(
    projectName,
    illustrationType
  ))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi.browseSameType(
            projectName,
            illustrationType
          )
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
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

export const browseSameTypeExtern = (
  req: any,
  res: any,
  next: any
) => {
  const projectName = req.body.projectName as string;
  const illustrationType: IllustrationTypes = req.params.type as IllustrationTypes
  return Promise.resolve(validateProjectNameAndIllustrationTypeAsString(
    projectName,
    illustrationType
  ))
    .then((valid) => {
      if (valid) {
        return Factory.getInstance()
          .BZL.illustrationApi.browseSameType(
            projectName,
            illustrationType
          )
          .asCallback((err: any, data: any) => {
            helper.returnResponse(res, err, data, next);
          });
      }
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
