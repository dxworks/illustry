import {Chart} from "./common-types";

export interface VerticalChartTypes {
  chart: Chart[];
  label: String;
  maxDomainInterval?: number;
  minDomainInterval?: number;
}
