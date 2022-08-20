import _ from "lodash";
import { IllustrationTypes, Node, Link, Illustration } from "types/illustrations";

export const constructIllustrationCSV = (type: IllustrationTypes | IllustrationTypes[], data: any) => {
    console.log("aici")
    console.log(data)
    const nodes: Node[] = []
    const links: Link[] = []
    let finalData = {}

    // const name: Set<string> = new Set()
    // const description: Set<string> = new Set()
    // const tags: Set<string> = new Set()

    if (type &&
        (type === IllustrationTypes.FORCE_DIRECTED_GRAPH ||
            type === IllustrationTypes.HIERARCHICAL_EDGE_BUNDLING ||
            type === IllustrationTypes.GRAPHVIZ ||
            type === IllustrationTypes.SANKEY ||
            type === IllustrationTypes.MATRIX)) {

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
        console.log(JSON.stringify(finalData, null, 2))
        return finalData
    }
}

export const getTypesFromCSV = (data: any) => {
    const types: Set<string> = new Set()

    _.forEach(data, d => {
        if (d.type && d.type !== '') {
            types.add(d.type)
        }
    })
    if (types.size > 0) {
        if (types.size === 1) {
            console.log(types)
            return [...types][0]
        }
        else {
            console.log(types)
            return [...types]
        }
    }
    else {
        throw Error('No types for visualization were provided')
    }
}