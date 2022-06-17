
import ProjectTable from "../../models/Project";
import _ from "lodash";
import { Promise } from "bluebird";
import IllustrationTable from "../../models/Illustrations";
import { readFile } from "../../utils/reader";
import {
  validateProject,
  validateProjectNameAsString,
  validateProjectNameAsStringAndProjectDescriptionAsString,
} from "../../validator/projectValidator";
 
import { illustrationValidator } from "../../validator/illustrationValidator";
import { FileProperties } from "types/fileproperties";
import { Project } from "types/project";
import { Illustration, IllustrationTypes, IllustrationUpdate } from "types/illustrations";
export class ProjectBZL {
  constructor() {}
  createProjectfromExtern = (
    projectName: string,
    projectDescription: string,
    illustrationName: string,
    illustrationType: IllustrationTypes | IllustrationTypes[],
    illustrationDescription: string,
    tags: string[],
    illustrationData: any
  ) => {
    let projectModel: Project = {
      name: projectName,
      description: projectDescription,
    };

    let illustrationModel: IllustrationUpdate = {
      projectName: projectName,
      name: illustrationName,
      description: illustrationDescription,
      data: illustrationData,
      type: illustrationType,
      tags: tags,
    };
    return Promise.resolve()
      .then(() => {
        return validateProject(projectModel, illustrationModel);
      })
      .then((valid: boolean) => {
        if (valid) {
          _.assign(projectModel, { createdAt: new Date() });
          _.assign(projectModel, { lastModified: new Date() });

          return ProjectTable.create(projectModel)
            .then((projectTable) => {
              _.assign(illustrationModel, { projectId: projectTable._id });
              _.assign(illustrationModel, { createdAt: new Date() });
              _.assign(illustrationModel, { lastModified: new Date() });
              return IllustrationTable.create(illustrationModel)
                .then(() => {
                  return "Project created";
                })
                .catch((err: any) => {
                  throw new Error(err);
                });
            })
            .catch((err: any) => {
              throw new Error("Duplicated name of the project");
            });
        }
      })
      .catch((err: any) => {
        throw err;
      });
  };

  createIllustryProject = (files: FileProperties[], project: Project) => {
    return Promise.resolve()
      .then(() => {
        let projectModel: Project = {
          name: project.name,
          description: project.description,
        };
        return projectModel;
      })
      .then((projectModel) => {
        return Promise.resolve()
          .then(() => {
            return validateProject(projectModel);
          })
          .then((valid: boolean) => {
            if (valid) {
              _.assign(projectModel, { createdAt: new Date() });
              _.assign(projectModel, { lastModified: new Date() });

              return ProjectTable.create(projectModel)
                .then((projectModel: any) => {
                  return readFile(files).then((projectsJson: any) => {
                    return Promise.map(projectsJson, (projectJson: any) => {
                      let illustrationModel: Illustration = {
                        data: projectJson.data,
                        description: projectJson.description,
                        projectName: projectModel.name,
                        name: projectJson.name,
                        type: projectJson.type,
                        tags: projectJson.tags,
                      };
                      return Promise.resolve()
                        .then(() => {
                          return illustrationValidator(illustrationModel);
                        })
                        .then((valid: boolean) => {
                          if (valid) {
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
                                  return "Illustration created";
                                });
                              });
                            } else {
                              return Promise.each(
                                illustrationModel.type,
                                (t) => {
                                  let newIllustrationModel: Illustration = {
                                    data: illustrationModel.data,
                                    description: illustrationModel.description,
                                    projectName: illustrationModel.projectName,
                                    name: illustrationModel.name,
                                    type: t,
                                    tags: illustrationModel.tags,
                                  };
                                  return IllustrationTable.findOneAndUpdate(
                                    {
                                      projectName:
                                        newIllustrationModel.projectName,
                                      name: newIllustrationModel.name,
                                      type: newIllustrationModel.type,
                                    },
                                    newIllustrationModel,
                                    { upsert: true, new: true }
                                  ).then((res: any) => {
                                    if (!res.createdAt) {
                                      _.assign(res, { createdAt: new Date() });
                                      _.assign(res, {
                                        lastModified: new Date(),
                                      });
                                    } else {
                                      _.assign(res, {
                                        lastModified: new Date(),
                                      });
                                    }
                                    return IllustrationTable.findOneAndUpdate(
                                      {
                                        _id: res._id,
                                      },
                                      res
                                    );
                                  });
                                }
                              ).then(() => {
                                return "Illustration created";
                              });
                            }
                          }
                        })
                        .catch((err: any) => {
                          throw err;
                        });
                    });
                  });
                })
                .catch((err) => {
                  throw new Error("Duplicated name of the project");
                });
            }
          })
          .catch((err) => {
            throw err;
          });
      });
  };

  updateProjectfromEtern = (
    projectName: string,
    projectDescription: string
  ) => {
    const projectToBeUpdated = {
      name: projectName,
      description: projectDescription,
    };
    return Promise.resolve()
      .then(() => {
        return validateProjectNameAsStringAndProjectDescriptionAsString(
          projectToBeUpdated.name,
          projectToBeUpdated.description
        );
      })
      .then((valid: boolean) => {
        if (valid) {
          return this.updateProject(
            projectToBeUpdated.name,
            projectToBeUpdated.description
          );
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  queryAllProjects = () => {
    return Promise.resolve().then(() => {
      return ProjectTable.find({})
        .select("-__v")
        .then((doc: any) => {
          return doc;
        });
    });
  };

  findOneProject = (projectName: string) => {
    let query = { name: { $eq: projectName } };
    return Promise.resolve()
      .then(() => {
        return validateProjectNameAsString(projectName);
      })
      .then((valid: boolean) => {
        if (valid) {
          return ProjectTable.findOne(query)
            .select(" -_id name description")
            .then((doc: any) => {
              if (doc) {
                return doc;
              } else {
                throw new Error(`No Project with name ${projectName} is found`);
              }
            });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  getOneProjectfromEtern = (projectName: string) => {
    return Promise.resolve().then(() => {
      return this.findOneProject(projectName);
    });
  };

  updateProject = (projectName: string, projectDescription: string) => {
    let update = { description: projectDescription, lastModified: new Date() };
    let query = { name: { $eq: projectName } };
    return Promise.resolve()
      .then(() => {
        return validateProjectNameAsStringAndProjectDescriptionAsString(
          projectName,
          projectDescription
        );
      })
      .then((valid: boolean) => {
        if (valid) {
          return ProjectTable.findOneAndUpdate(query, update, { new: true })
            .select(" -_id name description")
            .then((doc: any) => {
              return Promise.resolve(doc)
                .then((doc) => {
                  return doc;
                })
                .catch((err: any) => {
                  throw err;
                });
            })
            .catch((err: any) => {
              throw err;
            });
        }
      })
      .catch((err: any) => {
        throw err;
      });
  };

  deleteProject = (projectName: string) => {
    let queryProject = { name: { $eq: projectName } };
    let queryIllustration = { projectName: { $eq: projectName } };
    return Promise.resolve()
      .then(() => {
        return validateProjectNameAsString(projectName);
      })
      .then((valid: boolean) => {
        if (valid) {
          return IllustrationTable.deleteMany(queryIllustration)
            .then((doc: any) => {
              return ProjectTable.deleteOne(queryProject)
                .then((doc: any) => {
                  return Promise.resolve(doc).then((doc) => {
                    return { name: projectName };
                  });
                })
                .catch((err: any) => {
                  throw err;
                });
            })
            .catch((err: any) => {
              {
                throw err;
              }
            });
        }
      });
  };
}
