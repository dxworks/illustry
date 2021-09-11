import {Component, Input, OnInit} from '@angular/core';
import {IllustrationService} from "../../../services/illustration.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as d3 from "d3";

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.css']
})
export class HorizontalChartComponent implements OnInit {

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
    this.width = 510 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }


  ngOnInit(): void {
    console.log(this.data)
    this.createChart(this.data.chart,this.data.domainInterval)

  }

  createChart(StatsBarChart:any,domain:number) {
    this.initSvg();
    this.initAxis(StatsBarChart,domain);
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

  initAxis(StatsBarChart: any,domain:number) {
    this.x  = d3.scaleLinear()
      .domain([0, domain]) //sa faci si cu domeniul
      .range([ 0, this.width]);

    this.svg.append("g")
      .attr("transform", `translate(0,${this.height})`)
      .call(d3.axisBottom(this.x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
    this.y = d3.scaleBand()
      .range([ 0, this.width  ])
      .domain(StatsBarChart.map((d:any) => d.name))
      .padding(0.5);
    this.svg.append("g")
      .call(d3.axisLeft(this.y));
  }

  drawBars(StatsBarChart: any) {
    this.svg.selectAll("myRect")
      .data(StatsBarChart)
      .join("rect")
      .attr("x", this.x(0) )
      .attr("y", (d:any) => this.y(d.name))
      .attr("width", (d:any) => this.x(d.value)-this.width)
      .attr("height", this.y.bandwidth())
      .attr("fill", "#69b3a2")
  }

  createAnimation() {
    this.svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("width", (d:any) => this.x(d.value))
      .delay((d:any,i:number) => {console.log(i); return i*100})
  }
}
