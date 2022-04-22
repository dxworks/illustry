import ProjectTable from "../models/Project";
import _ from "lodash";
import IllustrationTable from "../models/Illustrations";
import { readFile } from "../utils/reader";
import { FileProperties } from "../types/fileproperties";
import { any, Promise } from "bluebird";
import {
  illustrationValidator,
  validateProjectNameAndIllustrationNameAsString,
  validateProjectNameAndIllustrationTypeAsString,
} from "../validator/illustrationValidator";
import {
  NodeLink,
  CalendarHeatmap,
  Timeline,
  Illustration,
  IllustrationUpdate,
  IllustrationTypes,
} from "../types/illustrations.";
import { validateProjectNameAsString } from "../validator/projectValidator";
export const addOrUpdateIllustrations = (
  projectName: string,
  files: FileProperties[],
  next: any
) => {
  let query = { name: { $eq: projectName } };
  return readFile(files).then((projectsJson: any) => {
    return ProjectTable.find(query)
      .cursor()
      .eachAsync((doc: any) => {
        if (doc)
          return Promise.map(projectsJson, (projectJson: any) => {
            let illustrationModel: Illustration = {
              data: projectJson.data,
              projectName: doc.name,
              description:projectJson.description,
              name: projectJson.name,
              type: projectJson.type,
              tags: projectJson.tags,
            };
            console.log(illustrationModel)
            if (illustrationValidator(illustrationModel)) {
              return Promise.resolve(illustrationModel)
                .then((illustrationModel) => {
                  if (typeof illustrationModel.type === "string") {
                    return IllustrationTable.findOneAndUpdate(
                      {
                        projectName: illustrationModel.projectName,
                        name: illustrationModel.name,
                      },
                      illustrationModel,
                      { upsert: true, new: true }
                    ).then((res: Illustration) => {
                      if (!res.createdAt) {
                        _.assign(res, { createdAt: new Date() });
                        _.assign(res, { lastModified: new Date() });
                      } else {
                        _.assign(res, { lastModified: new Date() });
                      }
                      return IllustrationTable.findOneAndUpdate(
                        {
                          projectName: res.projectName,
                          illustrationName: res.name,
                        },
                        res
                      ).then(() => {
                        next(null, { result: "Illustrations created" });
                      });
                    });
                  } else {
                    return Promise.each(illustrationModel.type, (t) => {
                      let newIllustrationModel: Illustration = {
                        data: illustrationModel.data,
                        projectName: illustrationModel.projectName,
                        description: illustrationModel.description,
                        name: illustrationModel.name,
                        type: t,
                        tags: illustrationModel.tags,
                      };

                      return IllustrationTable.findOneAndUpdate(
                        {
                          projectName: newIllustrationModel.projectName,
                          name: newIllustrationModel.name,
                          type: newIllustrationModel.type,
                        },
                        newIllustrationModel,
                        { upsert: true, new: true }
                      ).then((res: any) => {
                        if (!res.createdAt) {
                          _.assign(res, { createdAt: new Date() });
                          _.assign(res, { lastModified: new Date() });
                        } else {
                          _.assign(res, { lastModified: new Date() });
                        }
                        return IllustrationTable.findOneAndUpdate(
                          {
                            _id: res._id,
                          },
                          res
                        );
                      });
                    }).then(() => {
                      next(null, { result: "Illustrations created" });
                    });
                  }
                })
                .catch((err: any) => next(err, null));
            }
          }).catch((err: any) => next(err, null));
      });
  });
};

export const addIllustrationFromOtherSource = (
  projectName: string,
  illustrationName: string,
  illustrationDescription: string,
  illustrationType: IllustrationTypes | IllustrationTypes[],
  tags: string[],
  illustrationData:
    | NodeLink
    | CalendarHeatmap
    | Timeline
    | any,
  next: any
) => {
  let query = { name: { $eq: projectName } };

  return ProjectTable.find(query)
    .cursor()
    .eachAsync((doc: any) => {
      if (doc) {
        const illustrationModel: Illustration = {
          data: illustrationData,
          projectName: doc.name,
          description: illustrationDescription,
          name: illustrationName,
          type: illustrationType,
          tags: tags,
        };
        return Promise.resolve()
          .then(() => {
            return illustrationValidator(illustrationModel);
          })
          .then((valid: boolean) => {
            if (valid) {
              return Promise.resolve(illustrationModel)
                .then((res) => {
                  _.assign(res, { createdAt: new Date() });
                  _.assign(res, { lastModified: new Date() });

                  let illustrationTable = new IllustrationTable(res);
                  illustrationTable.save((err: any) => {
                    if (err) next(err, null);
                  });
                })
                .then((res: any) => {
                  next(null, { result: "Illustration created" });
                })
                .catch((err: any) => next(err, null));
            }
          })
          .catch((err: any) => {
            next(err, null);
          });
      }
    })
    .catch((err: any) => {
      next(err, null);
    });
};

export const updateIllustrationFromOtherSource = (
  projectName: string,
  illustrationName: string,
  illustrationDescription: string,
  illustrationType: IllustrationTypes | IllustrationTypes[],
  tags: string[],
  illustrationData:
    NodeLink
    | CalendarHeatmap
    | Timeline
    | any,
  next: any
) => {
  let query = {
    projectName: { $eq: projectName },
    name: { $eq: illustrationName },
  };

  let update = {
    name: illustrationName,
    description: illustrationDescription,
    tags: tags,
    data: illustrationData,
    type: illustrationType,
  };
  let ill: IllustrationUpdate = {
    projectName: projectName,
    name: illustrationName,
    description: illustrationDescription,
    tags: tags,
    data: illustrationData,
    type: illustrationType,
  };
  return Promise.resolve()
    .then(() => {
      return illustrationValidator(ill);
    })
    .then((valid: boolean) => {
      if (valid) {
        _.assign(update, { lastModified: new Date() });
        return IllustrationTable.findOneAndUpdate(query, update, { new: true })
          .select("-_id")
          .then((doc: any) => {
            return Promise.resolve(doc).then((doc) => {
              next(null, doc);
            });
          })
          .catch((err: any) => next(err, null));
      }
    })
    .catch((err: any) => {
      next(err, null);
    });
};

export const findAllIllustration = (projectName: string, next: any) => {
  let query = { projectName: { $eq: projectName } };
  return Promise.resolve()
    .then(() => {
      return validateProjectNameAsString(projectName);
    })
    .then((valid: boolean) => {
      if (valid) {
        return IllustrationTable.find(query)
          .then((doc: any) => {
            next(null, doc);
            return doc;
          })
          .catch((err: any) => next(err, null));
      }
    })
    .catch((err: any) => {
      next(err, null);
    });
};

export const findOneIllustration = (
  projectName: string,
  illustrationNameFromReq: string,
  next: any
) => {
  let query = {
    projectName: { $eq: projectName },
    name: { $eq: illustrationNameFromReq },
  };
  return Promise.resolve()
    .then(() => {
      return validateProjectNameAsString(projectName);
    })
    .then((valid: boolean) => {
      if (valid) {
        return IllustrationTable.find(query)
          .then((doc: any) => {
            next(null, doc);
            return doc;
          })
          .catch((err: any) => next(err, null));
      }
    })
    .catch((err: any) => next(err, null));
};

export const deleteIllustration = (
  projectName: string,
  illustrationNameFromReq: string,
  next: any
) => {
  let query = {
    projectName: { $eq: projectName },
    name: { $eq: illustrationNameFromReq },
  };
  return Promise.resolve()
    .then(() => {
      return validateProjectNameAndIllustrationNameAsString(
        projectName,
        illustrationNameFromReq
      );
    })
    .then((valid: boolean) => {
      if (valid) {
        return IllustrationTable.deleteOne(query).then((doc: any) => {
          return Promise.resolve(doc)
            .then((doc) => {
              next(null, { name: illustrationNameFromReq });
            })
            .catch((err: any) => next(err, null));
        });
      }
    })
    .catch((err: any) => next(err, null));
};

export const getAllIllustriesOfTheSameType = (
  projectName: string,
  illustrationType: string,
  next: any
) => {
  let query = {
    projectName: { $eq: projectName },
    type: { $eq: illustrationType },
  };
  return Promise.resolve()
    .then(() => {
      return validateProjectNameAndIllustrationTypeAsString(
        projectName,
        illustrationType
      );
    })
    .then((valid: boolean) => {
      if (valid) {
        return IllustrationTable.find(query)
          .then((doc: any) => {
            next(null, doc);
            return doc;
          })
          .catch((err: any) => next(err, null));
      }
    })
    .catch((err: any) => next(err, null));
};
