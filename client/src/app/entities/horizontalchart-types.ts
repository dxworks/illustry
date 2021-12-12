import {Chart} from "./common-types";

export interface HorizontalChartTypes {
  chart: Chart[];
  label: String;
  maxDomainInterval?: number;
  minDomainInterval?: number;
}
