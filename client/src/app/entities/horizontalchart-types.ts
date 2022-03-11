import { Chart } from "./common-types";

export interface HorizontalChartTypes {
  chart: Chart[];
  label: string;
  maxDomainInterval?: number;
  minDomainInterval?: number;
  step?: number
}
