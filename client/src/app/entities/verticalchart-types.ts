import { Chart } from "./common-types";

export interface VerticalChartTypes {
  chart: Chart[];
  label: string;
  maxDomainInterval?: number;
  minDomainInterval?: number;
  step?: number;
}

