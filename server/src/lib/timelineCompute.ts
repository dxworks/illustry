import _ from "lodash"
import IllustrationTable from "../models/Illustrations";
import moment from 'moment';
import {Timeline} from "../types/illustrations.";

export const checkSearch = (projectName: string, illustrationName: string, searchedTerm: string, fromDate: string, toDate: string, next: any) => {
  let query = {
    ProjectName: {$eq: projectName},
    IllustrationName: {$eq: illustrationName}
  };

  return IllustrationTable
    .findOne(query)
    .then((doc: any) => {
      return Promise.resolve(doc)
        .then((doc) => {
          console.log(doc)
          let data = doc.IllustrationData as Timeline
          let days: string[] = Object.keys(data)

          if (fromDate) {
            let from = moment(fromDate)
            days = days.filter(it => moment(it).isAfter(from))
          }
          if (toDate) {
            let to = moment(toDate)
            days = days.filter(it => moment(it).isBefore(to))
          }

          let events = days.flatMap((day: string) => data[day]?.events);

          if (searchedTerm) {
            events = events.filter(ev => {
              if (_.includes(_.toString(ev.summary), searchedTerm) ||
                _.includes(_.toString(ev.type), searchedTerm) ||
                _.includes(_.toString(ev.author), searchedTerm)) {
                return ev
              }
            })
          }
          const transformDate = (ev: any) => {
            return (moment(ev.date).format('YYYY-MM-DD'))
          }
          const finalEvents = _.chain(events).groupBy(transformDate).mapValues(value => {
            return {events: value}
          }).value();
          next(null, finalEvents)
        })
    })
    .catch((err: any) => {
      console.log(err);
      next(err, null)
    })
}
