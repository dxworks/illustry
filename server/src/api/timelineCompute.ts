import { Factory } from "../bzl/factory";
import { Promise } from "bluebird";
export const timelineComputeApi = {
  checkSearch(
    projectName: string,
    illustrationName: string,
    searchedTerm: string,
    fromDate: string,
    toDate: string
  ) {
    return Factory.getInstance().timelineComputeBzl.checkSearch(
      projectName,
      illustrationName,
      searchedTerm,
      fromDate,
      toDate
    );
  },
};
