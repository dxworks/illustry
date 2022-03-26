import { Project } from "../types/project";
import { illustrationValidator } from "./illustrationValidator";
import { Illustration, IllustrationUpdate } from "../types/illustrations.";
import * as FLGSchema from '../../jsonSchemas/FLG.json';
import * as DotSchema from '../../jsonSchemas/DOT.json';
import * as HEBSchema from '../../jsonSchemas/HEB.json';
import * as CalendarMatrixSchema from '../../jsonSchemas/CalendarHeatmap.json';
import * as MatrixSchema from '../../jsonSchemas/Matrix.json';
import * as SankeySchema from '../../jsonSchemas/Sankey.json';
import * as TimelineSchema from '../../jsonSchemas/Timeline.json';
import Ajv from 'ajv'
const ajv = new Ajv()
export const validateProjectNameAsString = (name: string) => {

    if (name && typeof name === 'string') {
        return true;
    }
    else {
        throw new TypeError("Name must be string")
    }
}

export const validateProject = (project: Project, illustration?: IllustrationUpdate | Illustration) => {
    let validProjectName = false;
    let validProjectDescription = false;
    let tagsValid = false;
    let projectNameValid = false;
    let illustrationNameValid = false;
    let illustrationTypeValid = false;
    let illustrationDataValid = false;
    let illustrationValid = false;
    if (illustration) {
        illustrationValid = illustrationValidator(illustration)
    }
    else {

        illustrationValid = true;
    }
    if (project.name && typeof project.name === 'string') {
        validProjectName = true;
    }
    else {
        throw new TypeError("Project Name must be string")
    }

    if (project.description) {
        if (typeof project.description === 'string' && project.description.length <= 250) {
            validProjectDescription = true;
        }
        else {
            throw new TypeError(" Description is either not string or is to long, max 250 characters")
        }
    }
    else {
        validProjectDescription = true;
    }

    return validProjectName && validProjectDescription && illustrationValid
}

export const validateProjectNameAsStringAndProjectDescriptionAsString = (projectName: string, projectDescription: string) => {
    let validateProjectName = false;
    let validateProjectDescription = false;
    if (projectName && typeof projectName === 'string') {
        validateProjectName = true;
    }
    else {
        throw new TypeError("Project name must be string")
    }
    if (typeof projectDescription === 'string' && projectDescription.length <= 250) {
        validateProjectDescription = true;
    }
    else {
        throw new TypeError("Project description is either not string or is to long, max 250 characters")
    }
    return validateProjectName && validateProjectDescription
}