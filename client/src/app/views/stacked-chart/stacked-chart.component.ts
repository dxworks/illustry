import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})
export class StackedChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private createStacked() {

    var svg = d3.select('#stacked')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 500);
  }
}
