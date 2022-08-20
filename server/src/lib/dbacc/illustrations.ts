
import _ from "lodash";
import { Illustration, IllustrationUpdate } from "types/illustrations";
import IllustrationTable from "../../models/Illustrations";

export class IllustrationDBACC {
  constructor() { }
  update(filter: any, illustration: IllustrationUpdate) { //IllustrationFilter
    console.log(filter)
    console.log(illustration)
    return IllustrationTable.findOneAndUpdate(filter, illustration, { upsert: true, new: true }).select('-_id')
  }

  browse(filter?: any) {
    return IllustrationTable.find(filter).select('-_id')
  }

  delete(filter?: any) {
    return IllustrationTable.deleteOne(filter)
  }

  deleteMany(filter?: any) {
    return IllustrationTable.deleteMany(filter)
  }

  create(illustration: Illustration) {
    return IllustrationTable.create(illustration);
  }

  findOne(filter: any) {
    return IllustrationTable.findOne(filter)
  }
}
