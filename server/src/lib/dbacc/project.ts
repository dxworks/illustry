
import ProjectTable from "../../models/Project";
import _ from "lodash";
import { Project } from "types/project";

export class ProjectDBACC {
  constructor() { }

  browse(filter?: any) {
    return ProjectTable.find(filter).select('-_id')
  }

  update(filter: any, description: string) {
    return ProjectTable.findOneAndUpdate(filter, { $set: { description: description, lastModified: new Date() } }).select('-_id')
  }

  create(project: Project) {
    return ProjectTable.create(project);
  }

  delete(filter?: any) {
    return ProjectTable.deleteOne(filter)
  }
  findOne(filter?: any) {
    return ProjectTable.findOne(filter).select('-_id')
  }
}
