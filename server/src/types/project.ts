import { CalendarHeatmap, DOT, FLG, HEB, Matrix, Sankey, Timeline } from "./illustrations.";

export interface Project {
    ProjectName: string;
    ProjectDescription: string;
    IllustrationName?: string;
    IllustrationData?: DOT | CalendarHeatmap | FLG | HEB | Sankey | Matrix | Timeline | any;
    Tags?: string[]
}