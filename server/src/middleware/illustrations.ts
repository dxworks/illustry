
import { Factory } from "../bzl/factory";
import _ from "lodash";

import * as helper from "../utils/helper";
import { IllustrationTypes } from "types/illustrations";

export const addOrUpdateIllustrations = (req: any, res: any, next: any) => {
  let projectName = req.params.projectName;

  let files = _.get(req, "files.File");
  if (_.isNil(files))
    return helper.returnResponse(
      res,
      { name: "invalidParam", message: "No files uploaded" },
      null,
      next
    );
  let computedFiles = _.map(files, (f) => {
    return {
      filePath: _.get(f, "path"),
      type: _.get(f, "mimetype"),
    };
  });
  Factory.getInstance()
    .api.illustrationApi.addOrUpdateIllustrations(projectName, computedFiles)
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const addIllustrationFromOtherSource = (
  req: any,
  res: any,
  next: any
) => {
  let projectName = req.body.projectName as string;
  let illustrationName = req.body.name as string;
  let illustrationType = req.body.type as
    | IllustrationTypes
    | IllustrationTypes[];
  let illustrationDescription = req.body.description as string;
  let tags = req.body.tags as string[];
  let illustrationData = req.body.data as any;
  Factory.getInstance()
    .api.illustrationApi.addIllustrationFromOtherSource(
      projectName,
      illustrationName,
      illustrationDescription,
      illustrationType,
      tags,
      illustrationData
    )
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const updateIllustrationFromOtherSource = (
  req: any,
  res: any,
  next: any
) => {
  let projectName = req.body.projectName as string;
  let illustrationName = req.body.name as string;
  let illustrationType = req.body.type as
    | IllustrationTypes
    | IllustrationTypes[];
  let illustrationDescription = req.body.description as string;
  let tags = req.body.tags as string[];
  let illustrationData = req.body.data as any;
  Factory.getInstance()
    .api.illustrationApi.updateIllustrationFromOtherSource(
      projectName,
      illustrationName,
      illustrationDescription,
      illustrationType,
      tags,
      illustrationData
    )
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const findAllIllustration = (req: any, res: any, next: any) => {
  let projectName = req.params.projectName;
  Factory.getInstance()
    .api.illustrationApi.findAllIllustration(projectName)
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const findAllIllustrationFromOtherSource = (
  req: any,
  res: any,
  next: any
) => {
  let projectName = req.body.name as string;

  Factory.getInstance()
    .api.illustrationApi.findAllIllustration(projectName)
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const findOneIllustration = (req: any, res: any, next: any) => {
  let projectName = req.params.projectName;
  let illustrationNameFromReq = req.params.illustrationName;

  Factory.getInstance()
    .api.illustrationApi.findOneIllustration(
      projectName,
      illustrationNameFromReq
    )
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const findOneIllustrationFromOtherSource = (
  req: any,
  res: any,
  next: any
) => {
  let projectName = req.body.projectName as string;
  let illustrationNameFromReq = req.body.name as string;
  Factory.getInstance()
    .api.illustrationApi.findOneIllustration(
      projectName,
      illustrationNameFromReq
    )
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const deteleIllustration = (req: any, res: any, next: any) => {
  let projectName = req.params.projectName;
  let illustrationNameFromReq = req.params.illustrationName;
  let type = req.params.type
  Factory.getInstance()
    .api.illustrationApi.deteleIllustration(
      projectName,
      illustrationNameFromReq,
      type
    )
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const deleteIllustrationFromExternalSource = (
  req: any,
  res: any,
  next: any
) => {
  let projectName = req.body.projectName as string;
  let illustrationName = req.body.name as string;
  let type = req.body.type
  Factory.getInstance()
    .api.illustrationApi.deteleIllustration(projectName, illustrationName,type)
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};
export const getAllIllustriesOfTheSameType = (
  req: any,
  res: any,
  next: any
) => {
  let projectName = req.params.projectName;
  let illustrationType = req.params.type;
  Factory.getInstance()
    .api.illustrationApi.getAllIllustriesOfTheSameType(
      projectName,
      illustrationType
    )
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};

export const getAllIllustriesOfTheSameTypeFromOtherSource = (
  req: any,
  res: any,
  next: any
) => {
  let projectName = req.body.projectName as string;
  let illustrationType = req.body.type as string;
  Factory.getInstance()
    .api.illustrationApi.getAllIllustriesOfTheSameType(
      projectName,
      illustrationType
    )
    .asCallback((err: any, data: any) => {
      helper.returnResponse(res, err, data, next);
    });
};
