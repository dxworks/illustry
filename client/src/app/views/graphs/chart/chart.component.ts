import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Chart, registerables } from 'chart.js';
import { VerticalChartTypes } from "../../../entities/verticalchart-types";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  chart: any = [];

  @Input()
  data: VerticalChartTypes | undefined;

  constructor() {

    Chart.register(...registerables)
  }


  ngOnInit(): void {
    if (this.data) {
      //@ts-ignore
      this.createChart({ chart: this.data.chart, label: this.data.label }, this.verifyMaxDomainInterval(this.data.maxDomainInterval, this.data.chart), this.verifyMinDomainInterval(this.data.minDomainInterval, this.data.chart))
    }
  }

  createChart(StatsBarChart: any, domainMax: number, domainMin: number) {
    const labels: string[] = Array.from(new Set(StatsBarChart.chart.map((d: any) => d.name)));
    const values: string[] = Array.from(new Set(StatsBarChart.chart.map((d: any) => d.value)));
    let delayed: boolean = false;
    //@ts-ignore
    var ctx = document.getElementById('myChart').getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: StatsBarChart.label,
          data: values,
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 99, 132, 1)',

        }]
      },
      options: {
        scales: {
          y: {
            suggestedMin: domainMin,
            suggestedMax: domainMax
          }
        },
        responsive: true,
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            //@ts-ignore
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        }
      }
    })
  }

  verifyMaxDomainInterval(maxDomain: number, StatsBarChart: any) {
    if (maxDomain === undefined || maxDomain === null) {
      const newMaxDomain = StatsBarChart.sort((a: any, b: any) => b.value - a.value)[0].value;
      return newMaxDomain;
    }
    else
      return maxDomain;
  }
  verifyMinDomainInterval(minDomain: number, StatsBarChart: any) {
    if (minDomain === undefined || minDomain === null) {
      const newMinDomain = StatsBarChart.sort((a: any, b: any) => a.value - b.value)[0].value;
      return newMinDomain;
    }
    else
      return minDomain;
  }
}
