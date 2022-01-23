import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { isNumber } from "@qntm-code/utils";
//@ts-ignore
import {Heatmap} from './hheatmap.js';
import { GanttChartTypes } from 'src/app/entities/gantChart-types.js';
 
@Component({
  selector: 'app-ganttchart',
  templateUrl: './ganttchart.component.html',
  styleUrls: ['./ganttchart.component.css']
})
export class GanttchartComponent implements OnInit {
//  // Define dimensions of the plot
//  margin = {top: 120, right: 60, bottom: 60, left: 180};
 height = 500; 
 width = 960;
 @Input()
  data:GanttChartTypes|undefined 
// // Define the transition duration
//  transDur = 500;
//  stats:any;
// // Set up a global variable for the names of the stats reported here
// // (in hopes of making it easier to keep line colors consistent
//  reportStats = [];

  
  ngOnInit(): void {
    //@ts-ignore
    this.createChart(this.data)}
private createChart=(data:GanttChartTypes) =>{
  const svg = d3.select('#gantt')
  .append('svg')
  .attr('width', window.innerWidth)
  .attr('height', window.innerHeight);
    //.attr("viewBox", [0, 0, this.width, this.height]);  
    
  const map = new Heatmap()
    .size(this.width, 640)
    //@ts-ignore
    .padding(2)
    .mapHeight(50)
    .data(d3.hierarchy(data));
 

  const cells = svg.selectAll("g")
  .data(map.populate())
  .enter()
  .append("g")
    .attr("fill", (d:any) => { return d.color;})
    .attr("transform", (d:any) => `translate(${d.x0}, 0)`)
    // .call((g:any) => g.append("title").text((d:any) => d.data ? `${d.data.name}\n${d3.format("$,.2f")(d.data.value)}` : ""));      
  cells
    .append("rect")      
    .attr("rx", 4).attr("ry", 4)
    .attr("width", (d:any) => d.x1 - d.x0)
    .attr("height", (d:any) => d.y1 - d.y0);
 
  // if (options.shape === "circle") {
  //   cells.filter((d:any) => d.height === 0)
  //     .append("circle")
  //     .attr("cx", (d:any) => d.cx).attr("cy", (d:any) => d.cy)
  //     .attr("r", (d:any) => d.r);
  // }  
    
  cells.append("g")
    .attr("text-anchor", "middle")
    .attr("transform", (d:any) => `translate(${(d.x1 - d.x0) / 2},${(d.y1 - d.y0) / 2})`)
    .call(g => g.append("text")
    .attr("fill", "black")
    .text((d:any) => d.data ? 
            (d.height === 0 ? d.data.name.slice(0, 10) : d.data.name) : ""))
    .call((g:any) => g.append("text")
          .attr("dy", "1em")
          .attr("fill", "black")
          .text((d:any) => d.data&&d.data.value ? (d.data.value) : ""));
  
  cells.transition().duration((d:any) => d.depth * 250)
    .ease(d3.easeBounce)
    .attr("opacity", 1)
    .attr("transform",(d:any) => `translate(${d.x0},${d.y0})`)
    .transition().delay(1000)
    .on("end", () => {
      //@ts-ignore
      cells.on("mouseover", (e: any, d: { data: any; ancestors: () => any; }) => { 
        if (d.data) {      
          const a = d.ancestors();
          cells.transition().duration(500)
            .attr("opacity", (c: any) => a.includes(c) ? 1 : 0.5);
        }})
      .on("mouseout", () => cells.transition().duration(500).attr("opacity", 1));
    });
  
  // svg.append("g").call(g => drawLegend(g, map.legend(9), cells));

  // return svg.node();
}
} 
  // This function creates a table with a row for each statistic in a flat data
// object and a column for each time period in the data object.

// private makeMultiTable = function(stats:any) {

//   // Set up the column names
//   // One set for the year supercolumns
//   var yrCols = d3.nest()
//       .key(function(d:any) { return d.stat_year; })
//       .rollup(function(d:any) { return d.length; })
//       .entries(stats.filter(function(d:any) { return d.stat_name == "Visits"; }));


//   // And one for the quarter columns
//   var qtrCols = d3.keys(
//       d3.nest()
//           .key(function(d:any) { return d.datestring; })
//           .map(stats)
//   );

//   // Add an empty column for the statistic name
//   // yrCols.unshift("");
//   // qtrCols.unshift("");




//   // Nest data within each statistic
//   var aggstats = d3.nest()
//       .key(function(d:any) { return d.stat_name; })
//       .entries(stats)

//   // Create the table
//   var table = d3.select("#table").append("table");
//   var thead = table.append("thead");
//   var tbody = table.append("tbody");

//   // Append the year headers
//   thead.append("tr")
//       .selectAll("th")
//       .data(yrCols)
//     .enter()
//       .append("th")
//           .text(function(d) { return d.key; })
//           .attr("colspan", function(d) { return d.values; })

//   // Append the quarter headers
//   thead.append("tr")
//       .selectAll("th")
//       .data(qtrCols)
//     .enter()
//       .append("th")
//           .text(function(column) { return column.substr(4, 6); })


//   // Bind each statistic to a line of the table
//   var rows = tbody.selectAll("tr")
//       .data(aggstats)
//     .enter()
//       .append("tr")
//           .attr("rowstat", function(d) { return d.key; })
//           .attr("chosen", false)
//           .attr("onclick", function(d) { 
//               return "toggleStat('" + d.key + "')"; })


//   // Add statistic names to each row
//   var stat_cells = rows.append("td")
//           .text(function(d) { return d.key; })
//           .attr("class", "rowkey")


//   // Fill in the cells.  The data -> d.values pulls the value arrays from
//   // the data assigned above to each row.
//   // The unshift crap bumps the data cells over one - otherwise, the first
//   // result value falls under the statistic labels.
//   var res_cells = rows.selectAll("td")
//       .data(function(d) { 
//           var x = d.values;
//           x.unshift({ qtr_result: ""} );
//           return x; })
//     .enter()
//       .append("td")
//         .text(function(d:any) { return d3.format(",d")(d.qtr_result); })
// };

// private loadqtry_stats = (crd:any) =>{
//   crd.forEach(function(d:any) {
//     d.stat_year = +d.stat_year;
//     d.stat_qtr = +d.stat_qtr;
//     d.datestring = d.stat_year + " Q" + d.stat_qtr;
//     d.qtr_result = +d.qtr_result;
// });

// // Subset to two sets of stats:
// // 1. Active Cases Reported for all metro residents and, separately,
// // just Denver residents.
// // 2. Active and latent tx starts and visits, for everyone
// var other_stats = ["Active Therapy Starts", "LTBI Therapy Starts", 
//                    "Visits"];

// var qtrly = crd.filter(function(d:any) {
//     return (d.stat_name == "Active Cases Reported" &&
//             d.pt_group == "County of Residence: Denver") || 

//            ((other_stats.indexOf(d.stat_name) > -1) && 
//             d.pt_group == "All Patients")
        
//         ; });


// // Assign the data outside of the function for later use
// this.stats = qtrly;


// // Load the initial stats table
// this.makeMultiTable(this.stats);

 
 

