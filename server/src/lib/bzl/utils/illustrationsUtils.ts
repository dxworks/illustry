import _ from "lodash";
import { IllustrationTypes, Node, Link } from "types/illustrations";

export const constructIllustrationCSV = (type: IllustrationTypes | IllustrationTypes[], data: any) => {
    const nodes: Node[] = []
    const links: Link[] = []
    let finalData = {}
    if (type &&
        (_.includes(type, IllustrationTypes.FORCE_DIRECTED_GRAPH) ||
            _.includes(type, IllustrationTypes.HIERARCHICAL_EDGE_BUNDLING) ||
            _.includes(type, IllustrationTypes.GRAPHVIZ) ||
            _.includes(type, IllustrationTypes.SANKEY) ||
            _.includes(type, IllustrationTypes.MATRIX))) {

        _.forEach(data, d => {
            if (d.group !== '' && d.id !== '')
                nodes.push({
                    group: d.group,
                    id: d.id
                })
            if (d.target !== '' && d.target !== '' && d.value !== "0") {
                links.push({
                    source: d.source,
                    target: d.target,
                    value: _.toNumber(d.value)
                })
            }
        })
        finalData = { links: links, nodes: nodes }

        return finalData
    }
}

