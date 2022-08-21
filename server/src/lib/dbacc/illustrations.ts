
import _ from "lodash";
import { Illustration, IllustrationUpdate, IllustrationFilter } from "types/illustrations";
import IllustrationTable from "../../models/Illustrations";

export class IllustrationDBACC {
  constructor() { }
  update(filter: any, illustration: IllustrationUpdate, upsert?: boolean) {

    return IllustrationTable.findOneAndUpdate(filter, illustration, { upsert: upsert, new: true }).select('-_id')
  }

  browse(filter?: IllustrationFilter) {
    const browseFilter = filter ? filter : {}
    return IllustrationTable.find(browseFilter).select('-_id')
  }

  delete(filter?: IllustrationFilter) {
    return IllustrationTable.deleteOne(filter)
  }

  deleteMany(filter?: IllustrationFilter) {
    return IllustrationTable.deleteMany(filter)
  }

  create(illustration: Illustration) {
    return IllustrationTable.create(illustration);
  }

  findOne(filter: IllustrationFilter) {
    return IllustrationTable.findOne(filter)
  }
}
