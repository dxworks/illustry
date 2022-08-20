
import * as helper from "../utils/helper";
import { Factory } from "../lib/factory";
export const checkSearch = (req: any, res: any, next: any) => {
  let projectName: string = req.body.ProjectName as string;
  let illustrationName: string = req.body.IllustrationName as string;
  let searchedText: string = req.body.searchedText as string;
  let fromDate = req.body.fromDate;
  let toDate = req.body.toDate;
  return Factory.getInstance()
    .BZL.timelineComputeApi.checkSearch(
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
