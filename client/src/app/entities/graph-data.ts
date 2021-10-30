export class GraphNode {
  constructor(public name: string,
              public component: number) {
  }
}

export class GraphLink {
  constructor(public source: string,
              public target: string,
              public value: number) {
  }
}

export class GraphData {
  constructor(public nodes: GraphNode[],
              public links: GraphLink[]) {

  }
}
