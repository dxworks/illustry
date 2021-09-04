import _ from 'lodash';
import * as macros from '../utils/macros';
const fs = require("fs");
import { promisify } from 'bluebird';
import ProjectTable from '../models/project';
import { Entity } from '../types/entity';
import EntityTypeTable from '../models/entityType';
import EntityTable from '../models/entity';
import RelationTypeTable from '../models/relationType';
import RelationTable from '../models/relations';


const readFile = (filePath: any, projectId: any, next: any) => {
    fs.readFile(filePath, (error: any, data: any) => {
        if (error) {
            throw error
        }
        next(null, { ...projectId, ...JSON.parse(data.toString()) })
    })
}
export const createEmptyProject = (filePath: any, projectId: any) => {

    return promisify(readFile)(filePath, projectId)
        .then((projectJson) => {

            let emptyProject = { projectId: _.get(projectJson, 'projectId', '') };
            let projectTable = new ProjectTable(emptyProject)
            return projectTable
        })
        .then(projectTable => {
            projectTable.save((err: any) => {
                if (err) {
                    console.log(err)
                    throw err;
                }
                else
                    console.log("REUSITA")
            })
        })
}

export const createEntityTypes = (filePath: any, projectId: any) => {
    return promisify(readFile)(filePath, projectId)
        .then((projectJson) => {
            let entityType = macros.getEntityTypes(projectJson, _.get(projectJson, 'projectId', ''))
            return entityType
        })
        .then((entityTypes) => {
            _.forEach(entityTypes, (entityType) => {
                let projectTable = ProjectTable.find({ projectId: { $eq: _.get(entityType, 'projectId', '') } }, '', null, (error: any, projects: any) => {
                    _.forEach(projects, (project) => {
                        let entityTypesTable = new EntityTypeTable({ name: _.get(entityType, 'name'), projectId: _.get(project, '_id'), projectName: _.get(project, 'projectId') })
                        entityTypesTable.save((err: any) => {
                            if (err) {
                                console.log(err)
                                throw err;
                            }
                            else
                                console.log("REUSITA la entityType")
                        })
                    })
                });
            })
        })
}

export const createRelationTypes = (filePath: any, projectId: any) => {
    return promisify(readFile)(filePath, projectId)
        .then((projectJson) => {
            let relationTypes = macros.getRelationTypes(projectJson, _.get(projectJson, 'projectId', ''))
            return relationTypes
        })
        .then((relationTypes) => {
            _.forEach(relationTypes, (relationType) => {
                let projectTable = ProjectTable.find({ projectId: { $eq: _.get(relationType, 'projectId', '') } }, '', null, (error: any, projects: any) => {
                    _.forEach(projects, (project) => {
                        let relationTypes = new RelationTypeTable({ name: _.get(relationType, 'name'), projectId: _.get(project, '_id'), projectName: _.get(project, 'projectId') })
                        relationTypes.save((err: any) => {
                            if (err) {
                                console.log(err)
                                throw err;
                            }
                            else
                                console.log("REUSITA la relationType")
                        })
                    })
                });
            })
        })
}

export const createEntities = (filePath: any, projectId: any) => {
    return promisify(readFile)(filePath, projectId)
        .then((projectJson) => {
            let entities = macros.getEntities(projectJson, _.get(projectJson, 'projectId', ''))
            return entities
        })
        .then((entities) => {
            console.log(entities)
            _.forEach(entities, (entity) => {
                let entityTypeTable = EntityTypeTable.find({
                    projectName: { $eq: _.get(entity, 'projectId', '') },
                    name: { $eq: _.get(entity, 'type', '') }
                }, '', null, (error: any, entityTypes: any) => {
                    _.forEach(entityTypes, (entityType) => {
                        let entityTable = new EntityTable({ name: _.get(entity, 'id'), projectId: _.get(entityType, 'projectId'), type: _.get(entityType, '_id'), projectName: _.get(entityType, 'projectName') })
                        entityTable.save((err: any) => {
                            if (err) {
                                console.log(err)
                                throw err;
                            }
                            else
                                console.log("REUSITA la entities")
                        })
                    })
                });
            })
        })
}

// export const createRelations = (filePath: any, projectId: any) => {
//     return promisify(readFile)(filePath, projectId)
//         .then((projectJson) => {
//             let relations = macros.getRelations(projectJson, _.get(projectJson, 'projectId', ''))
//             return relations
//         })
//         .then((relations) => {
//             _.forEach(relations, (relation) => {
//                 let relationTypeTable = RelationTypeTable.find({
//                     projectName: { $eq: _.get(relation, 'projectId', '') },
//                     name: { $eq: _.get(relation, 'relationType', '') }
//                 }, '', null, (error: any, relationTypes: any) => {

//                     _.forEach(relationTypes, (relationType) => {

//                         let relationTable = new RelationTable({
//                             relationsType: _.get(relationType, '_id'), sourceEntity: _.get(relation, 'sourceId'), entityTypeId: _.get(relation, 'entityType'),
//                             targetEntity: _.get(relation, 'targetId'), projectId: _.get(relationType, 'projectId'), value: _.get(relation, 'value'), projectName: _.get(relationType, 'projectName')
//                         })
//                         relationTable.save((err: any) => {
//                             if (err) {
//                                 console.log(err)
//                                 throw err;
//                             }
//                             else
//                                 console.log("REUSITA la relation")
//                         })
//                     })
//                 });
//             })
//         })
// }

export const createProject = (filePath: any, projectId: any) => {
    return Promise.resolve()
        .then(() => {
            return createEmptyProject(filePath, projectId);
        })
        .then(() => {
            return createEntityTypes(filePath, projectId);
        })
        .then(() => {
            return createRelationTypes(filePath, projectId);
        })
        .then(() => {
            return createEntities(filePath, projectId);
        })

    // .then(() => {
    //     return createRelations(filePath, projectId);
    // })
}
