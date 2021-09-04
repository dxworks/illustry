import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Illustration} from "../../../../types/illustration.model";
import {IllustrationService} from "../../../services/illustration.service";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private width: number;
  private height: number;
  margin = {top: 20, right: 20, bottom: 30, left: 40};
  x: any;
  y: any;
  svg: any;
  g: any;
  @Input()
  data: any;

  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute, private router: Router) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }


  ngOnInit(): void {
    console.log(this.data)
    this.createChart(this.data)

  }

  createChart(StatsBarChart:any) {
    this.initSvg();
    this.initAxis(StatsBarChart);
    this.drawBars(StatsBarChart);
    this.createAnimation();
  }
  initSvg() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '80%')
      .attr('height', '160%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis(StatsBarChart: any) {
    this.x  = d3.scaleBand()
      .range([ 0, this.width ])
      .domain(StatsBarChart.map((d:any) => d.name))
      .padding(0.5);
    this.svg.append("g")
      .attr("transform", `translate(0,${this.height})`)
      .call(d3.axisBottom(this.x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
    this.y = d3.scaleLinear()
      .domain(d3.range(StatsBarChart.length))
      .range([ this.height, 10]);
    this.svg.append("g")
      .call(d3.axisLeft(this.y));
  }

  drawBars(StatsBarChart: any) {
    this.svg.selectAll("mybar")
      .data(StatsBarChart)
      .join("rect")
      .attr("x", (d:any) => this.x(d.name))
      .attr("width", this.x.bandwidth())
      .attr("fill", "#69b3a2")
      // no bar at the beginning thus:
      .attr("height", (d:any) => this.height - this.y(0)) // always equal to 0
      .attr("y", (d:any) => this.y(0))
  }
  createAnimation() {
    this.svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", (d:any) => this.y(d.value))
      .attr("height", (d:any) => this.height - this.y(d.value))
      .delay((d:any,i:number) => {console.log(i); return i*100})
  }
}
