
import { Promise } from "bluebird";
import { IllustrationTypes, NodeLink, CalendarHeatmap, Timeline, Illustration } from "types/illustrations";
import { FileProperties } from "types/fileproperties";
import { Factory } from "../factory";
import { readFile } from "../../utils/reader";
import _ from "lodash";
import { illustrationValidator } from "../../validator/illustrationValidator";
import { constructIllustrationCSV, getTypesFromCSV } from "./utils/illustrationsUtils";


export const illustrationBZL = {
  addOrUpdateJSON(projectName: string, files: FileProperties[]) {
    return Promise.resolve()
      .then(() => {
        return readFile(files).then((illustrationsJSON: any) => {
          return Factory.getInstance().ProjectDBACC.browse({ name: projectName })
            .cursor()
            .eachAsync((doc: any) => {
              if (doc) {
                return Promise.map(illustrationsJSON, (illustrationJSON: any) => {
                  const illustrationModel: Illustration = {
                    data: illustrationJSON.data,
                    projectName: doc.name,
                    description: illustrationJSON.description,
                    name: illustrationJSON.name,
                    type: illustrationJSON.type,
                    tags: illustrationJSON.tags,
                  };
                  if (illustrationValidator(illustrationModel)) {
                    if (typeof illustrationModel.type === "string") {
                      return Factory.getInstance().IllustrationDBACC.update({
                        projectName: illustrationModel.projectName,
                        name: illustrationModel.name,
                      }, illustrationModel)
                        .then((res: Illustration) => {
                          if (!res.createdAt) {
                            _.assign(res, { createdAt: new Date() });
                            _.assign(res, { lastModified: new Date() });
                          } else {
                            _.assign(res, { lastModified: new Date() });
                          }
                          return Factory.getInstance().IllustrationDBACC.update(
                            {
                              projectName: res.projectName,
                              name: res.name,
                            },
                            res
                          ).then(() => {
                            return "Illustrations created";
                          });
                        })
                    }
                    else {
                      return Promise.each(illustrationModel.type, (t) => {
                        let newIllustrationModel: Illustration = {
                          data: illustrationModel.data,
                          projectName: illustrationModel.projectName,
                          description: illustrationModel.description,
                          name: illustrationModel.name,
                          type: t,
                          tags: illustrationModel.tags,
                        };
                        return Factory.getInstance().IllustrationDBACC.update(
                          {
                            projectName: newIllustrationModel.projectName,
                            name: newIllustrationModel.name,
                            type: newIllustrationModel.type,
                          },
                          newIllustrationModel)
                          .then((res: any) => {
                            if (!res.createdAt) {
                              _.assign(res, { createdAt: new Date() });
                              _.assign(res, { lastModified: new Date() });
                            } else {
                              _.assign(res, { lastModified: new Date() });
                            }
                            return Factory.getInstance().IllustrationDBACC.update(
                              {
                                _id: res._id,
                              },
                              res)
                          }).then(() => {
                            return "Illustrations created";
                          });
                      })
                    }
                  }
                })
              }
            }).catch((err: any) => {
              throw err;
            });
        });
      })
  },
  addOrUpdateCSV(illustration: Illustration, separator: string, files: FileProperties[]) {
    return Promise.resolve()
      .then(() => {
        return readFile(files, separator)
          .then((illustrationsCSV: any) => {
            return Promise.resolve(Factory.getInstance().IllustrationDBACC.findOne({ projectName: illustration.projectName }))
              .then(doc => {
                if (doc) {
                  return Promise.map(illustrationsCSV, (illustrationsCSV: any) => {
                    const data = constructIllustrationCSV(illustration.type, illustrationsCSV)
                    _.set(illustration, 'data', data)
                    console.log("inainte de validare")
                    console.log(JSON.stringify(illustration, null, 2))
                    if (illustrationValidator(illustration)) {
                      if (typeof illustration.type === "string") {
                        return Factory.getInstance().IllustrationDBACC.update({
                          projectName: illustration.projectName,
                          name: illustration.name,
                        }, illustration)
                          .then((res: Illustration) => {
                            if (!res.createdAt) {
                              _.assign(res, { createdAt: new Date() });
                              _.assign(res, { lastModified: new Date() });
                            } else {
                              _.assign(res, { lastModified: new Date() });
                            }
                            return Factory.getInstance().IllustrationDBACC.update(
                              {
                                projectName: res.projectName,
                                name: res.name,
                              },
                              res
                            ).then(() => {
                              return "Illustrations created";
                            });
                          })
                      }
                      else {
                        return Promise.each(illustration.type, (t) => {
                          let newIllustrationModel: Illustration = {
                            data: data,
                            projectName: illustration.projectName,
                            description: illustration.description,
                            name: illustration.name,
                            type: t,
                            tags: illustration.tags,
                          };
                          return Factory.getInstance().IllustrationDBACC.update(
                            {
                              projectName: newIllustrationModel.projectName,
                              name: newIllustrationModel.name,
                              type: newIllustrationModel.type,
                            },
                            newIllustrationModel)
                            .then((res: any) => {
                              if (!res.createdAt) {
                                _.assign(res, { createdAt: new Date() });
                                _.assign(res, { lastModified: new Date() });
                              } else {
                                _.assign(res, { lastModified: new Date() });
                              }
                              return Factory.getInstance().IllustrationDBACC.update(
                                {
                                  _id: res._id,
                                },
                                res)
                            }).then(() => {
                              return "Illustrations created";
                            });
                        })
                      }
                    }
                  })
                }
              }).catch((err: any) => {
                throw err;
              });
          });
      })
  },
  browse(projectName: string) {
    return Promise.resolve(Factory.getInstance().IllustrationDBACC.browse({
      projectName: projectName
    }))

  },

  findOne(projectName: string, illustrationName: string) {
    return Promise.resolve(Factory.getInstance().IllustrationDBACC.browse({
      projectName: projectName,
      name: illustrationName
    }))

  },

  _delete(
    projectName: string,
    illustrationName: string,
    type: IllustrationTypes
  ) {
    return Promise.resolve(Factory.getInstance().IllustrationDBACC.delete({
      projectName: projectName,
      name: illustrationName,
      type: type
    }))
      .then(() => {
        return { name: illustrationName, type: type };
      });
  },

  updateExtern(
    illustration: Illustration
  ) {
    return Promise.resolve(Factory.getInstance().IllustrationDBACC.update(
      {
        projectName: illustration.projectName,
        name: illustration.name
      }, illustration))

  },

  addExtern(
    illustration: Illustration
  ) {
    return Promise.resolve()
      .then(() => {
        return Factory.getInstance().ProjectDBACC.browse(
          {
            name: illustration.projectName
          })
          .cursor()
          .eachAsync((doc: any) => {
            if (doc) {
              _.assign(illustration, { createdAt: new Date() });
              _.assign(illustration, { lastModified: new Date() });
            }
            return Factory.getInstance().IllustrationDBACC.create(illustration)
          })
      })
  },

  browseSameType(projectName: string, illustrationType: IllustrationTypes | IllustrationTypes[]) {
    return Promise.resolve(Factory.getInstance().IllustrationDBACC.browse(
      {
        projectName: projectName,
        type: illustrationType
      }))

  },
};


