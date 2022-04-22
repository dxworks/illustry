import * as illustrationLib from "../lib/illustrations";
import { FileProperties } from "../types/fileproperties";
import {
  NodeLink,
  CalendarHeatmap,
  Timeline,
  IllustrationTypes,
} from "../types/illustrations.";

export function addOrUpdateIllustrations(
  projectName: string,
  files: FileProperties[],
  next: any
) {
  return Promise.resolve().then(() => {
    return illustrationLib.addOrUpdateIllustrations(projectName, files, next);
  });
}

export function findAllIllustration(projectName: string, next: any) {
  return Promise.resolve().then(() => {
    return illustrationLib.findAllIllustration(projectName, next);
  });
}

export function findOneIllustration(
  projectName: string,
  illustrationNameFromReq: string,
  next: any
) {
  return Promise.resolve().then(() => {
    return illustrationLib.findOneIllustration(
      projectName,
      illustrationNameFromReq,
      next
    );
  });
}

export function deteleIllustration(
  projectName: string,
  illustrationNameFromReq: string,
  next: any
) {
  return Promise.resolve().then(() => {
    return illustrationLib.deleteIllustration(
      projectName,
      illustrationNameFromReq,
      next
    );
  });
}

export function updateIllustrationFromOtherSource(
  projectName: string,
  illustrationName: string,
  illustrationDescription: string,
  illustrationType: IllustrationTypes | IllustrationTypes[],
  tags: string[],
  illustrationData: NodeLink | CalendarHeatmap | Timeline | any,
  next: any
) {
  return Promise.resolve().then(() => {
    return illustrationLib.updateIllustrationFromOtherSource(
      projectName,
      illustrationName,
      illustrationDescription,
      illustrationType,
      tags,
      illustrationData,
      next
    );
  });
}
export function addIllustrationFromOtherSource(
  projectName: string,
  illustrationName: string,
  illustrationDescription: string,
  illustrationType: IllustrationTypes | IllustrationTypes[],
  tags: string[],
  illustrationData: NodeLink | CalendarHeatmap | Timeline | any,
  next: any
) {
  return Promise.resolve().then(() => {
    return illustrationLib.addIllustrationFromOtherSource(
      projectName,
      illustrationName,
      illustrationDescription,
      illustrationType,
      tags,
      illustrationData,
      next
    );
  });
}

export function getAllIllustriesOfTheSameType(
  projectName: string,
  illustrationType: string,
  next: any
) {
  return Promise.resolve().then(() => {
    return illustrationLib.getAllIllustriesOfTheSameType(
      projectName,
      illustrationType,
      next
    );
  });
}
