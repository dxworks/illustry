
import { Promise } from "bluebird";
import { IllustrationTypes, NodeLink, CalendarHeatmap, Timeline } from "types/illustrations";
import { FileProperties } from "types/fileproperties";
import { Factory } from "../bzl/factory";
 

export const illustrationApi = {
  addOrUpdateIllustrations(projectName: string, files: FileProperties[]) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().illustrationBzl.addOrUpdateIllustrations(
        projectName,
        files
      );
    });
  },

  findAllIllustration(projectName: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().illustrationBzl.findAllIllustration(
        projectName
      );
    });
  },

  findOneIllustration(projectName: string, illustrationNameFromReq: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().illustrationBzl.findOneIllustration(
        projectName,
        illustrationNameFromReq
      );
    });
  },

  deteleIllustration(
    projectName: string,
    illustrationNameFromReq: string,
    type: IllustrationTypes
  ) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().illustrationBzl.deleteIllustration(
        projectName,
        illustrationNameFromReq,
        type
      );
    });
  },

  updateIllustrationFromOtherSource(
    projectName: string,
    illustrationName: string,
    illustrationDescription: string,
    illustrationType: IllustrationTypes | IllustrationTypes[],
    tags: string[],
    illustrationData: NodeLink | CalendarHeatmap | Timeline | any
  ) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().illustrationBzl.updateIllustrationFromOtherSource(
        projectName,
        illustrationName,
        illustrationDescription,
        illustrationType,
        tags,
        illustrationData
      );
    });
  },
  addIllustrationFromOtherSource(
    projectName: string,
    illustrationName: string,
    illustrationDescription: string,
    illustrationType: IllustrationTypes | IllustrationTypes[],
    tags: string[],
    illustrationData: NodeLink | CalendarHeatmap | Timeline | any
  ) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().illustrationBzl.addIllustrationFromOtherSource(
        projectName,
        illustrationName,
        illustrationDescription,
        illustrationType,
        tags,
        illustrationData
      );
    });
  },

  getAllIllustriesOfTheSameType(projectName: string, illustrationType: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().illustrationBzl.getAllIllustriesOfTheSameType(
        projectName,
        illustrationType
      );
    });
  },
};
