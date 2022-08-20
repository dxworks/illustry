
import ProjectTable from "../../models/Project";
import _ from "lodash";
import { Project, ProjectFilter } from "types/project";

export class ProjectDBACC {
  constructor() { }

  browse(filter?: ProjectFilter) {
    const browseFilter = filter ? filter : {}
    return ProjectTable.find(browseFilter).select('-_id')
  }

  update(filter: ProjectFilter, description: string) {
    return ProjectTable.findOneAndUpdate(filter, { $set: { description: description, lastModified: new Date() } }).select('-_id')
  }

  create(project: Project) {
    return ProjectTable.create(project);
  }

  delete(filter?: ProjectFilter) {
    return ProjectTable.deleteOne(filter)
  }
  findOne(filter?: ProjectFilter) {
    return ProjectTable.findOne(filter).select('-_id')
  }
}
