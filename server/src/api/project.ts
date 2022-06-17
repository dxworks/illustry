
import { Factory } from "../bzl/factory";
import { Promise } from "bluebird";
 
import { FileProperties } from "types/fileproperties";
import { Project } from "types/project";
import { IllustrationTypes } from "types/illustrations";

export const projectApi = {
  createProjectfromExtern(
    projectName: string,
    projectDescription: string,
    illustrationName: string,
    illustrationType: IllustrationTypes | IllustrationTypes[],
    illustrationDescription: string,
    tags: string[],
    illustrationData: any
  ) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.createProjectfromExtern(
        projectName,
        projectDescription,
        illustrationName,
        illustrationType,
        illustrationDescription,
        tags,
        illustrationData
      );
    });
  },

  updateProjectfromEtern(projectName: string, projectDescription: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.updateProjectfromEtern(
        projectName,
        projectDescription
      );
    });
  },

  getOneProjectfromEtern(projectName: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.getOneProjectfromEtern(
        projectName
      );
    });
  },

  createIllustryProject(files: FileProperties[], project: Project) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.createIllustryProject(
        files,
        project
      );
    });
  },

  findOneProject(projectName: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.findOneProject(projectName);
    });
  },

  queryAllProjects() {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.queryAllProjects();
    });
  },

  updateProject(projectName: string, projectDescription: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.updateProject(
        projectName,
        projectDescription
      );
    });
  },

  deleteProject(projectName: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().projectBzl.deleteProject(projectName);
    });
  },
};
