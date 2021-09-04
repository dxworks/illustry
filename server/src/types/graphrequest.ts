export interface GraphRequest {
    classifier: String;
    entity: String;
    projectId: String;
    relation: String;
    cluster: Number;
    strength: Number;
    checkSource: Boolean;
    checkTarget: Boolean;
    views: String[];
    sourceQuery: String;
    targetQuery: String;
}