
import * as helper from "../utils/helper";
import { Factory } from "../bzl/factory";
export const checkSearch = (req: any, res: any, next: any) => {
  let projectName = req.body.ProjectName;
  let illustrationName = req.body.IllustrationName;
  let searchedText = req.body.searchedText;
  let fromDate = req.body.fromDate;
  let toDate = req.body.toDate;
  return Factory.getInstance()
    .api.timelineComputeApi.checkSearch(
      projectName,
      illustrationName,
      searchedText,
      fromDate,
      toDate
    )
    .asCallback((errGPC: any, data: any) => {
      helper.returnResponse(res, errGPC, data, next);
    });
};
