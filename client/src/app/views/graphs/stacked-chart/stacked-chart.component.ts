// @ts-nocheck
import {Component, Input, OnInit} from '@angular/core';
import * as d3 from "d3";
import {Chart, registerables} from "chart.js";
import { Chart, registerables } from 'chart.js';
import {OverviewType} from "../matrixcalendar/matrixcalendar.component";

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.css']
})


export class StackedChartComponent implements OnInit {
  @Input()
  data: any;

  chart: any[];
  color: any;
  constructor() {
    Chart.register(...registerables)
  }

  ngOnInit(): void {

    this.createStacked(this.data)
  }
  private createRandomColor() {
    const randomNumber =Math.floor(Math.random() * 122);
    const lastNumber = Math.random()*2;
    return `rgb(${randomNumber},${randomNumber},${randomNumber},${lastNumber})`
  }

  private createStacked(data: any) {
    const labels:string[] = Array.from(new Set(data.chart.map((d:any) => d.group)));
    const subgroups: string[] = data.subgroups;
    let datasets : any[] = [];
    let finalDatasets:any[] = [];
    this.color = d3.scaleOrdinal(d3.schemeCategory10)
    subgroups.forEach((subgroup) => { finalDatasets.push({label:subgroup}); datasets[subgroup] = data.chart.map((d:any) => d[subgroup])})
      console.log(datasets)
    finalDatasets.forEach((fd) => { console.log(fd);finalDatasets.map((d:any) => {d.borderColor =this.color(fd); d.backgroundColor =this.createRandomColor(); d.data =datasets[Object.values(fd)[0]]})})
    console.log(finalDatasets)
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
        }
      }
    })
  }
}
    // set the dimensions and margins of the graph
//     var margin = {top: 10, right: 30, bottom: 20, left: 50},
//       width = 460 - margin.left - margin.right,
//       height = 400 - margin.top - margin.bottom;
//
// // append the svg object to the body of the page
//     var svg = d3.select("#my_dataviz")
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");
//
//     const subgroups = data.subgroups;
//    console.log(subgroups)
//     const groups = data.chart.map(d => d.group);
//    console.log(groups)
//     const x = d3.scaleBand()
//       .domain(groups)
//       .range([0, width])
//       .padding([0.2])
//     svg.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(x).tickSizeOuter(0));
//
//     // Add Y axis
//     const y = d3.scaleLinear()
//       .domain([0, 60])
//       .range([ height, 0 ]);
//     svg.append("g")
//       .call(d3.axisLeft(y));
//
//     // color palette = one color per subgroup
//     const color = d3.scaleOrdinal()
//       .domain(subgroups)
//       .range(['#C7EFCF','#FE5F55','#EEF5DB','#006000'])
//
//     //stack the data? --> stack per subgroup
//     const stackedData = d3.stack()
//       .keys(subgroups)
//       (data.chart)
//
//
//
//     const tooltip = d3.select("#my_dataviz")
//       .append("div")
//       .style("opacity", 0)
//       .attr("class", "tooltip")
//       .style("background-color", "white")
//       .style("border", "solid")
//       .style("border-width", "1px")
//       .style("border-radius", "5px")
//       .style("padding", "10px")
//
//     // Three function that change the tooltip when user hover / move / leave a cell
//     const mouseover = function(event, d) {
//       const subgroupName = d3.select(this.parentNode).datum().key;
//
//       const subgroupValue = data.chart[d][subgroupName];
//       d3.selectAll(".myRect").style("opacity", 0.2)
//
//       // Highlight all rects of this subgroup with opacity 1. It is possible to select them since they have a specific class = their name.
//       d3.selectAll("."+subgroupName).style("opacity",1)
//       tooltip
//         .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
//         .style("opacity", 1)
//
//     }
//     const mousemove = function(event, d) {
//       tooltip.style("transform","translateY(-55%)")
//         .style("left",(event.x)/2+"px")
//         .style("top",(event.y)/2-30+"px")
//     }
//     const mouseleave = function(event, d) {
//       tooltip
//         .style("opacity", 0)
//     }
//
//     // Show the bars
//     svg.append("g")
//       .selectAll("g")
//       // Enter in the stack data = loop key per key = group per group
//       .data(stackedData)
//       .join("g")
//       .attr("fill", d => color(d.key))
//       .attr("class", d => "myRect " + d.key ) // Add a class to each subgroup: their name
//       .selectAll("rect")
//       // enter a second time = loop subgroup per subgroup to add all rectangles
//       .data(d => d)
//       .join("rect")
//       .attr("x", d =>  x(d.data.group))
//       .attr("y", d => y(d[1]))
//       .attr("height", d => y(d[0]) - y(d[1]))
//       .attr("width",x.bandwidth())
//       .attr("stroke", "grey")
//       .on("mouseover", mouseover)
//       .on("mousemove", mousemove)
//       .on("mouseleave", mouseleave)
//
//   }
// }
