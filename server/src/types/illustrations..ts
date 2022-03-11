export interface Illustration {
    ProjectId: string;
    ProjectName: string;
    IllustrationType: string;
    IllustrationName: string;
    Tags: string[];
}


interface TimelineEventTag {
    name: string
    style: any
}

export interface TimelineEvent {
    summary: string
    date: string
    type: string
    author: string
    tags?: TimelineEventTag[]
    description?: string
    style: any
}

export interface Timeline {
    [date: string]: {
        summary?: {
            title?: string,
            style?: any
        },
        events: TimelineEvent[],
    }
}

export interface CalendarHeatmap {
    calendar: CalendarData[]
    categories: any
    tooltip?: any
}
export interface Matrix {
    nodes: NodesMatrix[]
    links: LinksMatrix[]
}

export interface DOT {
    nodes: Node[];
    links: Link[];
}

export interface CalendarMatrix {
    calendarData: CalendarData[]
}

export interface FLG {
    nodes: Node[];
    links: Link[];
}

export interface HEB {
    nodes: Node[];
    links: Link[];
}

// export interface VerticalStackedCharts {
//     chart: any[];
//     maxDomainInterval?: number;
//     minDomainInterval?: number;
//     step?: number;
//     colorMapping: any[]
// }
// export interface HorizontalStackedCharts {
//     chart: any[];
//     maxDomainInterval?: number;
//     minDomainInterval?: number;
//     step?: number;
//     colorMapping: any[]
// }
// export interface HorizontalChart {
//     chart: Chart[];
//     label: string;
//     maxDomainInterval?: number;
//     minDomainInterval?: number;
// }

// export interface VerticalChart {
//     chart: Chart[];
//     label: string;
//     maxDomainInterval?: number;
//     minDomainInterval?: number;
//     step?: number;
// }
export interface Sankey {
    nodes: NodesSankey[];
    links: LinksSankey[];
    colorMapping?: any[]
}



//Details for FLG HEB Sankey And Dot
  interface Node {
    group: string;
    id?: string;
}
interface NodesMatrix extends Node {
    properties?: [{
        label: string,
        value: Number,
        style: any
    }]
}

interface Link {
    source: string;
    target: string;
    value: number;
}
interface NodesSankey extends Node {
    properties?: any | string
}
interface LinksSankey extends Link {
    properties?: any | string
}
interface LinksMatrix extends Link {
    style?: any
}

interface CalendarData {
    date: string,
    value: number,
    year: number,
    category: string
}
//Details for Horizontal/Vertical Charts 

// interface Chart {
//     name: string,
//     value: number,
//     properties?: any | string
// }