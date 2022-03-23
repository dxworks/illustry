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
export const illustrationValidator = (illustration: Illustration | IllustrationUpdate) => {
    let tagsValid = false;
    let projectNameValid = false;
    let illustrationNameValid = false;
    let illustrationTypeValid = false;
    let illustrationDataValid = false;
    if (illustration.Tags) {
        let tagsChecker = illustration.Tags.every(function (e) {
            return typeof e === "string"
        })

        if (Array.isArray(illustration.Tags) && tagsChecker) {
            tagsValid = true;
        }
        else {
            throw new TypeError("Tags does not exist or are not array or not all elements are string")
        }

    }
    else {
        tagsValid = true;
    }

    if (illustration.ProjectName && typeof illustration.ProjectName === "string") {
        projectNameValid = true;
    }
    else {
        throw new TypeError("ProjectName doesn't exist or is not string")
    }

    if (illustration.IllustrationName && typeof illustration.IllustrationName === "string") {
        illustrationNameValid = true;
    }
    else {
        throw new TypeError("IllustrationName doesn't exist or is not string")
    }

    if (illustration.IllustrationType && typeof illustration.IllustrationType === "string") {
        switch (illustration.IllustrationType) {
            case "chart": {
                illustrationTypeValid = true;
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object") {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType charts does not correspond to illustrationData")
                }
                break
            }
            case "wordcloud": {
                illustrationTypeValid = true;
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object") {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType wordcloud does not correspond to illustrationData")
                }
                break
            }
            case "ploty": {
                illustrationTypeValid = true;
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object") {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType ploty does not correspond to illustrationData")
                }
                break
            }
            case "timeline": {
                illustrationTypeValid = true
                // const validate = ajv.compile(TimelineSchema)
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object") {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType timeline does not correspond to illustrationData")
                }
                break
            }
            case "flg": {
                illustrationTypeValid = true
                const validate = ajv.compile(FLGSchema)
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object" && validate(illustration.IllustrationData)) {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType flg does not correspond to illustrationData")
                }
                break
            }

            case "treemap": {
                illustrationTypeValid = true
                break
            }
            case "sankeydiagram": {
                illustrationTypeValid = true
                const validate = ajv.compile(SankeySchema)
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object" && validate(illustration.IllustrationData)) {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType sankey does not correspond to illustrationData")
                }
                break
            }
            case "calendarmatrix": {
                illustrationTypeValid = true
                const validate = ajv.compile(CalendarMatrixSchema)
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object" && validate(illustration.IllustrationData)) {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType calendarmatrix does not correspond to illustrationData")
                }
                break
            }
            case "matrix": {
                illustrationTypeValid = true
                const validate = ajv.compile(MatrixSchema)
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object" && validate(illustration.IllustrationData)) {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType matrix does not correspond to illustrationData")
                }
                break
            }
            case "graphiz": {
                illustrationTypeValid = true
                const validate = ajv.compile(DotSchema)
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object" && validate(illustration.IllustrationData)) {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType graphiz does not correspond to illustrationData")
                }
                break
            }
            case "heb": {
                illustrationTypeValid = true
                const validate = ajv.compile(HEBSchema)
                if (illustration.IllustrationData && typeof illustration.IllustrationData === "object" && validate(illustration.IllustrationData)) {
                    illustrationDataValid = true;
                }
                else {
                    throw new TypeError("illustrationType heb does not correspond to illustrationData")
                }
                break
            }
            default: throw new TypeError("IllustrationType is not one of the known types")
        }
    } else {
        throw new TypeError("IllustrationType doesn't exist or is not string")
    }

    if (illustration.IllustrationData && typeof illustration.IllustrationData === "object") {

        illustrationDataValid = true;
    }
    else {
        throw new TypeError("IllustrationData doesn't exist or is not object")
    }
    return tagsValid && projectNameValid && illustrationNameValid && illustrationTypeValid && illustrationDataValid;
}

export const validateProjectNameAndIllustrationNameAsString = (projectName: string, illustrationName: string) => {
    let validProject = false;
    let validIllustration = false;
    if (projectName && typeof projectName === 'string') {
        validProject = true;
    }
    else {
        throw new TypeError("ProjectName must be string")
    }
    if (illustrationName && typeof illustrationName === 'string') {
        validIllustration = true;
    }
    else {
        throw new TypeError("IllustrationName must be string")
    }
    return validProject && validIllustration
}


export const validateProjectNameAndIllustrationTypeAsString = (projectName: string, illustrationType: string) => {
    let validProject = false;
    let validIllustration = false;
    if (projectName && typeof projectName === 'string') {
        validProject = true;
    }
    else {
        throw new TypeError("ProjectName must be string")
    }
    if (illustrationType && typeof illustrationType === 'string') {
        validIllustration = true;
    }
    else {
        throw new TypeError("IllustrationType must be string")
    }
    return validProject && validIllustration
}