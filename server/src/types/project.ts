import { AllIllustrations } from "./illustrations.";

export interface Project {
    ProjectName: string;
    ProjectDescription: string;
    IllustrationName?:string;
    IllustrationData?: AllIllustrations
    Tags?: string[]
}