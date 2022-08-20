
import { Factory } from "../factory";
import { Promise } from "bluebird";
import { Project } from "types/project";
import { Illustration } from "index";
import _ from "lodash";

export const projectBZL = {
  createExtern(
    project: Project,
    illustration: Illustration
  ) {
    _.assign(project, { createdAt: new Date() });
    _.assign(project, { lastModified: new Date() });
    _.assign(illustration, { createdAt: new Date() });
    _.assign(illustration, { lastModified: new Date() });
    return Promise.resolve(Factory.getInstance().ProjectDBACC.create(project))
      .then(() => {
        return Promise.resolve(Factory.getInstance().IllustrationDBACC.create(illustration))
      })
  },

  create(project: Project) {
    _.assign(project, { createdAt: new Date() });
    _.assign(project, { lastModified: new Date() });
    return Promise.resolve(Factory.getInstance().ProjectDBACC.create(project))

  },

  findOne(projectName: string) {
    return Promise.resolve(
      Factory.getInstance().ProjectDBACC.browse({ name: projectName })
    )
  },

  browse() {
    return Promise.resolve(Factory.getInstance().ProjectDBACC.browse())
  },

  update(projectName: string, projectDescription: string) {
    return Promise.resolve().then(() => {
      return Factory.getInstance().ProjectDBACC.update(
        { name: projectName },
        projectDescription
      );
    });
  },

  delete(projectName: string) {
    return Promise.resolve(Factory.getInstance().IllustrationDBACC.deleteMany({ projectName: projectName }))
      .then(() => {
        return Promise.resolve(
          Factory.getInstance().ProjectDBACC.delete({ name: projectName })
        )
      })
  },
};
