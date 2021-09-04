import _ from 'lodash';

export const getEntities = (file:any, projectName: String) =>{ 
    return _.uniqBy(_.get(file,'entities','').map(
    function(o:any) {
        return Object.assign({
          projectId: projectName,
          id: o.id,
          type: o.type
        });
      }),'id'); 
    }

export const getEntityTypes = (file:any, projectName: String) => { 
    return _.uniqBy(_.get(file, 'entities', '').map(
    function(o:any) {
        return Object.assign({
          projectId: projectName,  
          name: o.type
        }, _.omit(o, 'id', 'type'));
      }),'name'); 
  }

export const getRelationTypes = (file:any, projectName: String) => { 
    return _.uniqBy(_.get(file, 'relations', '').map(
    function(o:any) {
        return Object.assign({
          projectId: projectName,  
          name: o.relationType
        }, _.omit(o, 'relationType', 'entityType',"sourceId","targetId", "value"));
      }),'name'); 
  }

export const getRelations = (file:any,projectName: String) => { 
    return (_.get(file,'relations','').map(
    function(o:any) {
        return Object.assign({ 
          projectId: projectName,
          relationType: o.relationType,
          entityType: o.entityType,
          sourceId: o.sourceId,
          targetId: o.targetId,
          value: o.value
        });
      })) 
    }

export const getClassifier = (file:any) => {
  return _.uniqBy(_.get(file,'classifiers','').map(
    function(o:any) {
        return Object.assign({
          Name: o.name,
          EntityType: o.entityType,
          Categories: o.categories
        }, _.omit(o,'categories','name','entityType'));
      }),'Name'); 
    }

export const getTraits = (file:any) => {
  return _.get(file,'traits','').map(
    function(o:any) {
        return Object.assign({
          Name: o.name,
          EntityType: o.entityType,
          entityId: o.entityId,
          value: o.value
        }, _.omit(o,'entityId','name','entityType','value'));
      }) 
    }

    export const getProperties = (file:any) => {
      return _.get(file,'properties','').map(
        function(o:any) {
            return Object.assign({
              Name: o.name,
              EntityType: o.entityType,
              entityId: o.entityId,
              value: o.value
            }, _.omit(o,'entityId','name','entityType','value'));
          }) 
        }
   
    
