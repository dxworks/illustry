import { Illustration, IllustrationTypes, IllustrationUpdate } from "../types/illustrations.";
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
    // let tagsValid = false;
    // let projectNameValid = false;
    // let illustrationNameValid = false;
    // let illustrationTypeValid = false;
    // let illustrationDataValid = false;
    // if (illustration.tags) {
    //     let tagsChecker = illustration.tags.every(function (e) {
    //         return typeof e === "string"
    //     })

    //     if (Array.isArray(illustration.tags) && tagsChecker) {
    //         tagsValid = true;
    //     }
    //     else {
    //         throw new TypeError("Tags does not exist or are not array or not all elements are string")
    //     }

    // }
    // else {
    //     tagsValid = true;
    // }

    // if (illustration.projectName && typeof illustration.projectName === "string") {
    //     projectNameValid = true;
    // }
    // else {
    //     throw new TypeError("ProjectName doesn't exist or is not string")
    // }

    // if (illustration.name && typeof illustration.name === "string") {
    //     illustrationNameValid = true;
    // }
    // else {
    //     throw new TypeError("IllustrationName doesn't exist or is not string")
    // }

    // if (illustration.type && typeof illustration.type === "string") {
    //     switch (illustration.type) {
    //         case IllustrationTypes.CHART: {
    //             illustrationTypeValid = true;
    //             if (illustration.type && typeof illustration.data === "object") {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType charts does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.WORLD_CLOUD: {
    //             illustrationTypeValid = true;
    //             if (illustration.data && typeof illustration.data === "object") {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType wordcloud does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.PLOTLY: {
    //             illustrationTypeValid = true;
    //             if (illustration.data && typeof illustration.data === "object") {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType ploty does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.TIMELINE: {
    //             illustrationTypeValid = true
    //             // const validate = ajv.compile(TimelineSchema)
    //             if (illustration.data && typeof illustration.data === "object") {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType timeline does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.FORCE_DIRECTED_GRAPH: {
    //             illustrationTypeValid = true
    //             const validate = ajv.compile(FLGSchema)
    //             if (illustration.data && typeof illustration.data === "object" && validate(illustration.data)) {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType flg does not correspond to illustrationData")
    //             }
    //             break
    //         }

    //         case IllustrationTypes.TREEMAP: {
    //             illustrationTypeValid = true
    //             break
    //         }
    //         case IllustrationTypes.SANKEY: {
    //             illustrationTypeValid = true
    //             const validate = ajv.compile(SankeySchema)
    //             if (illustration.data && typeof illustration.data === "object" && validate(illustration.data)) {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType sankey does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.CALENDAR: {
    //             illustrationTypeValid = true
    //             const validate = ajv.compile(CalendarMatrixSchema)
    //             if (illustration.data && typeof illustration.data === "object" && validate(illustration.data)) {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType calendar does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.MATRIX: {
    //             illustrationTypeValid = true
    //             const validate = ajv.compile(MatrixSchema)
    //             if (illustration.data && typeof illustration.data === "object" && validate(illustration.data)) {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType matrix does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.GRAPHVIZ: {
    //             illustrationTypeValid = true
    //             const validate = ajv.compile(DotSchema)
    //             if (illustration.data && typeof illustration.data === "object" && validate(illustration.data)) {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType graphviz does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         case IllustrationTypes.HIERARCHICAL_EDGE_BUNDLING: {
    //             illustrationTypeValid = true
    //             const validate = ajv.compile(HEBSchema)
    //             if (illustration.data && typeof illustration.data === "object" && validate(illustration.data)) {
    //                 illustrationDataValid = true;
    //             }
    //             else {
    //                 throw new TypeError("illustrationType heb does not correspond to illustrationData")
    //             }
    //             break
    //         }
    //         default: throw new TypeError("IllustrationType is not one of the known types")
    //     }
    // } else {
    //     // if (illustration.type && typeof illustration.type === "object" && typeof illustration.type.length === 'number') {
    //     //     for (let i = 0; i <)
    //     // }
    // }

    // if (illustration.data && typeof illustration.data === "object") {

    //     illustrationDataValid = true;
    // }
    // else {
    //     throw new TypeError("IllustrationData doesn't exist or is not object")
    // }
    // return tagsValid && projectNameValid && illustrationNameValid && illustrationTypeValid && illustrationDataValid;
    return true
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