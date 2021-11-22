// @ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Chart, registerables } from "chart.js";
import { Chart, registerables } from 'chart.js';
import { OverviewType } from "../matrixcalendar/matrixcalendar.component";

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})


export class StackedChartComponent implements OnInit {
  @Input()
  data: any;
  color: any;
  chart: any[];

  constructor() {
    Chart.register(...registerables)
  }

  ngOnInit(): void {

    this.createStacked(this.data)
  }
  private createRandomColor() {
    const randomNumber = Math.floor(Math.random() * 122);
    const lastNumber = Math.random() * 2;
    return `rgb(${randomNumber},${randomNumber},${randomNumber},${lastNumber})`
  }
  private createStacked(data: any) {
    const labels: string[] = Array.from(new Set(data.chart.map((d: any) => d.group)));
    const subgroups: string[] = data.subgroups;
    let datasets: any[] = [];
    let finalDatasets: any[] = [];
    this.color = d3.scaleOrdinal(d3.schemeCategory10)
    subgroups.forEach((subgroup) => { finalDatasets.push({ label: subgroup, color: this.color(subgroup) }); datasets[subgroup] = data.chart.map((d: any) => d[subgroup]) })
    finalDatasets.forEach((fd) => {finalDatasets.map((d: any) => { d.borderColor = d.color; d.backgroundColor = d.color; d.data = datasets[Object.values(fd)[0]] }) })
    //@ts-ignore
    var ctx = document.getElementById('myChart').getContext('2d');
    const graphdata = {
      labels: labels,
      datasets: finalDatasets
    };


    this.chart = new Chart(ctx, {
      type: 'bar',
      data: graphdata,
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        },
      }
    })
  }
}

