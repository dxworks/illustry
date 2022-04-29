import _ from "lodash";
import IllustrationTable from "../../models/Illustrations";
import moment from "moment";
import { Timeline } from "../../types/illustrations.";

export class TimelineComputeBZL {
  constructor() {}
  checkSearch = (
    projectName: string,
    illustrationName: string,
    searchedTerm: string,
    fromDate: string,
    toDate: string
  ) => {
    let query = {
      ProjectName: { $eq: projectName },
      IllustrationName: { $eq: illustrationName },
    };

    return IllustrationTable.findOne(query)
      .then((doc: any) => {
        return Promise.resolve(doc).then((doc) => {
          let events: any[] = _.flattenDeep(
            Object.values(_.get(doc, "data.timeline")).map(
              (obj: any) => {
                return obj.events;
              }
            )
          );

          if (fromDate) {
            events = events.filter((ev) => {
              if (
                moment(moment(ev.date).format("YYYY-MM-DD")).diff(
                  moment(moment(fromDate).format("YYYY-MM-DD")),
                  "days"
                ) >= 0 ||
                moment(moment(ev.date).format("YYYY-MM-D")).diff(
                  moment(moment(fromDate).format("YYYY-MM-D")),
                  "days"
                ) >= 0 ||
                moment(moment(ev.date).format("YYYY-M-D")).diff(
                  moment(moment(fromDate).format("YYYY-M-D")),
                  "days"
                ) >= 0
              )
                return ev;
            });
          }
          if (toDate) {
            events = events.filter((ev) => {
              if (
                moment(moment(ev.date).format("YYYY-MM-DD")).diff(
                  moment(moment(fromDate).format("YYYY-MM-DD")),
                  "days"
                ) <= 0 ||
                moment(moment(ev.date).format("YYYY-MM-D")).diff(
                  moment(moment(fromDate).format("YYYY-MM-D")),
                  "days"
                ) <= 0 ||
                moment(moment(ev.date).format("YYYY-M-D")).diff(
                  moment(moment(fromDate).format("YYYY-M-D")),
                  "days"
                ) <= 0
              )
                return ev;
            });
          }
          if (searchedTerm) {
            events = events.filter((ev) => {
              if (
                _.includes(_.toString(ev.summary), searchedTerm) ||
                _.includes(_.toString(ev.type), searchedTerm) ||
                _.includes(_.toString(ev.author), searchedTerm)
              ) {
                return ev;
              }
            });
          }
          const transformDate = (ev: any) => {
            return moment(ev.date).format("YYYY-MM-DD");
          };
          const finalEvents = _.chain(events)
            .groupBy(transformDate)
            .mapValues((value) => {
              return { events: value };
            })
            .value();
          return finalEvents;
        });
      })
      .catch((err: any) => {
        console.log(err);
        {
          throw err;
        }
      });
  };
}
