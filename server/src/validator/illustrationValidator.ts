 
import * as CalendarMatrixSchema from "../../jsonSchemas/CalendarHeatmap.json";
import * as NodeLinkSchema from "../../jsonSchemas/NodeLink.json";
import * as TimelineSchema from "../../jsonSchemas/Timeline.json";

import Ajv from "ajv";
import { Illustration, IllustrationTypes, IllustrationUpdate } from "types/illustrations";
const ajv = new Ajv();
export const illustrationValidator = (
  illustration: Illustration | IllustrationUpdate
) => {
  let tagsValid = false;
  let projectNameValid = false;
  let illustrationNameValid = false;
  let illustrationTypeValid = false;
  let illustrationDataValid = false;
  let illustrationDescription = false;
  if (illustration.description) {
    if (
      typeof illustration.description === "string" &&
      illustration.description.length <= 250
    ) {
      illustrationDescription = true;
    }
  } else {
    illustrationDescription = true;
  }
  if (illustration.tags) {
    let tagsChecker = illustration.tags.every(function (e) {
      return typeof e === "string";
    });

    if (Array.isArray(illustration.tags) && tagsChecker) {
      tagsValid = true;
    } else {
      throw new TypeError(
        "Tags does not exist or are not array or not all elements are string"
      );
    }
  } else {
    tagsValid = true;
  }

  if (
    illustration.projectName &&
    typeof illustration.projectName === "string"
  ) {
    projectNameValid = true;
  } else {
    throw new TypeError("Project name doesn't exist or is not string");
  }

  if (illustration.name && typeof illustration.name === "string") {
    illustrationNameValid = true;
  } else {
    throw new TypeError("Illustration name doesn't exist or is not string");
  }

  if (illustration.type && typeof illustration.type === "string") {
    switch (illustration.type) {
      case IllustrationTypes.CHART: {
        illustrationTypeValid = true;
        if (illustration.type && typeof illustration.data === "object") {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type charts does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.WORLD_CLOUD: {
        illustrationTypeValid = true;
        if (illustration.data && typeof illustration.data === "object") {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type word-cloud does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.PLOTLY: {
        illustrationTypeValid = true;
        if (illustration.data && typeof illustration.data === "object") {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type plotly does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.TIMELINE: {
        illustrationTypeValid = true;
        // const validate = ajv.compile(TimelineSchema)
        if (illustration.data && typeof illustration.data === "object") {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type timeline does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.FORCE_DIRECTED_GRAPH: {
        illustrationTypeValid = true;
        const validate = ajv.compile(NodeLinkSchema);
        if (
          illustration.data &&
          typeof illustration.data === "object" &&
          validate(illustration.data)
        ) {
          illustrationDataValid = true;
        } else {
          throw new TypeError(
            "type force-directed-graph does not correspond to data"
          );
        }
        break;
      }

      case IllustrationTypes.TREEMAP: {
        illustrationTypeValid = true;
        break;
      }
      case IllustrationTypes.SANKEY: {
        illustrationTypeValid = true;
        const validate = ajv.compile(NodeLinkSchema);
        if (
          illustration.data &&
          typeof illustration.data === "object" &&
          validate(illustration.data)
        ) {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type sankey does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.CALENDAR: {
        illustrationTypeValid = true;
        const validate = ajv.compile(CalendarMatrixSchema);
        if (
          illustration.data &&
          typeof illustration.data === "object" &&
          validate(illustration.data)
        ) {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type calendar does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.MATRIX: {
        illustrationTypeValid = true;
        const validate = ajv.compile(NodeLinkSchema);
        console.log(validate(illustration.data));
        if (
          illustration.data &&
          typeof illustration.data === "object" &&
          validate(illustration.data)
        ) {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type matrix does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.GRAPHVIZ: {
        illustrationTypeValid = true;
        const validate = ajv.compile(NodeLinkSchema);
        if (
          illustration.data &&
          typeof illustration.data === "object" &&
          validate(illustration.data)
        ) {
          illustrationDataValid = true;
        } else {
          throw new TypeError("type graphviz does not correspond to data");
        }
        break;
      }
      case IllustrationTypes.HIERARCHICAL_EDGE_BUNDLING: {
        illustrationTypeValid = true;
        const validate = ajv.compile(NodeLinkSchema);
        if (
          illustration.data &&
          typeof illustration.data === "object" &&
          validate(illustration.data)
        ) {
          illustrationDataValid = true;
        } else {
          throw new TypeError(
            "type hierarchical-edge-bundling does not correspond to data"
          );
        }
        break;
      }
      default:
        throw new TypeError(
          `type ${illustration.type} is not one of the known types`
        );
    }
  } else {
    if (
      illustration.type &&
      typeof illustration.type === "object" &&
      typeof illustration.type.length === "number"
    ) {
      for (let i = 0; i < illustration.type.length; i++) {
        switch (illustration.type[i]) {
          case IllustrationTypes.CHART: {
            illustrationTypeValid = true;
            if (illustration.type && typeof illustration.data === "object") {
              illustrationDataValid = true;
            } else {
              throw new TypeError("type charts does not correspond to data");
            }
            break;
          }
          case IllustrationTypes.WORLD_CLOUD: {
            illustrationTypeValid = true;
            if (illustration.data && typeof illustration.data === "object") {
              illustrationDataValid = true;
            } else {
              throw new TypeError(
                "type word-cloud does not correspond to data"
              );
            }
            break;
          }
          case IllustrationTypes.PLOTLY: {
            illustrationTypeValid = true;
            if (illustration.data && typeof illustration.data === "object") {
              illustrationDataValid = true;
            } else {
              throw new TypeError("type plotly does not correspond to data");
            }
            break;
          }
          case IllustrationTypes.TIMELINE: {
            illustrationTypeValid = true;
            // const validate = ajv.compile(TimelineSchema)
            if (illustration.data && typeof illustration.data === "object") {
              illustrationDataValid = true;
            } else {
              throw new TypeError("type timeline does not correspond to data");
            }
            break;
          }
          case IllustrationTypes.FORCE_DIRECTED_GRAPH: {
            illustrationTypeValid = true;
            const validate = ajv.compile(NodeLinkSchema);
            if (
              illustration.data &&
              typeof illustration.data === "object" &&
              validate(illustration.data)
            ) {
              illustrationDataValid = true;
            } else {
              throw new TypeError(
                "type force-directed-graph does not correspond to data"
              );
            }
            break;
          }

          case IllustrationTypes.TREEMAP: {
            illustrationTypeValid = true;
            break;
          }
          case IllustrationTypes.SANKEY: {
            illustrationTypeValid = true;
            const validate = ajv.compile(NodeLinkSchema);
            if (
              illustration.data &&
              typeof illustration.data === "object" &&
              validate(illustration.data)
            ) {
              illustrationDataValid = true;
            } else {
              throw new TypeError("type sankey does not correspond to data");
            }
            break;
          }
          case IllustrationTypes.CALENDAR: {
            illustrationTypeValid = true;
            const validate = ajv.compile(CalendarMatrixSchema);
            if (
              illustration.data &&
              typeof illustration.data === "object" &&
              validate(illustration.data)
            ) {
              illustrationDataValid = true;
            } else {
              throw new TypeError("type calendar does not correspond to data");
            }
            break;
          }
          case IllustrationTypes.MATRIX: {
            illustrationTypeValid = true;
            const validate = ajv.compile(NodeLinkSchema);
            // if (
            //   illustration.data &&
            //   typeof illustration.data === "object" &&
            //   validate(illustration.data)
            // ) {
              illustrationDataValid = true;
            // } else {
            //   throw new TypeError("type matrix does not correspond to data");
            // }
            break;
          }
          case IllustrationTypes.GRAPHVIZ: {
            illustrationTypeValid = true;
            const validate = ajv.compile(NodeLinkSchema);
            if (
              illustration.data &&
              typeof illustration.data === "object" &&
              validate(illustration.data)
            ) {
              illustrationDataValid = true;
            } else {
              throw new TypeError("type graphviz does not correspond to data");
            }
            break;
          }
          case IllustrationTypes.HIERARCHICAL_EDGE_BUNDLING: {
            illustrationTypeValid = true;
            const validate = ajv.compile(NodeLinkSchema);
            if (
              illustration.data &&
              typeof illustration.data === "object" &&
              validate(illustration.data)
            ) {
              illustrationDataValid = true;
            } else {
              throw new TypeError(
                "type hierarchical-edge-bundling does not correspond to data"
              );
            }
            break;
          }
          default:
            throw new TypeError(
              `type ${illustration.type[i]} is not one of the known types`
            );
        }
      }
    } else {
      throw new TypeError("Illustration Type is not string or string[]");
    }
  }

  if (illustration.data && typeof illustration.data === "object") {
    illustrationDataValid = true;
  } else {
    throw new TypeError("data doesn't exist or is not object");
  }
  return (
    tagsValid &&
    projectNameValid &&
    illustrationNameValid &&
    illustrationTypeValid &&
    illustrationDataValid &&
    illustrationDescription
  );
};

export const validateProjectNameAndIllustrationNameAsString = (
  projectName: string,
  illustrationName: string
) => {
  let validProject = false;
  let validIllustration = false;
  if (projectName && typeof projectName === "string") {
    validProject = true;
  } else {
    throw new TypeError("Project name must be string");
  }
  if (illustrationName && typeof illustrationName === "string") {
    validIllustration = true;
  } else {
    throw new TypeError("Illustration name must be string");
  }
  return validProject && validIllustration;
};

export const validateProjectNameAndIllustrationTypeAsString = (
  projectName: string,
  illustrationType: string
) => {
  let validProject = false;
  let validIllustration = false;
  if (projectName && typeof projectName === "string") {
    validProject = true;
  } else {
    throw new TypeError("Project name must be string");
  }
  if (illustrationType && typeof illustrationType === "string") {
    validIllustration = true;
  } else {
    throw new TypeError("Illustration type must be string");
  }
  return validProject && validIllustration;
};
