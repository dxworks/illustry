import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  @Input()
  data: any;

  constructor() { }

  ngOnInit(): void {
  console.log(this.data)
    this.createHeatMap(this.data.links, this.verifyMaxDomainInterval(this.data.maxDomainInterval,this.data.links),this.verifyMinDomainInterval(this.data.minDomainInterval,this.data.links))
  }

  private createHeatMap(data:any, domainMax:number, domainMin:number){
    // set the dimensions and margins of the graph
    const margin = {top: 80, right: 25, bottom: 30, left: 40},
      width = 450 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const rows:string[] = Array.from(new Set(data.map((d:any) => d.row)))
    console.log(rows)

    const columns:string[] = Array.from(new Set(data.map((d:any) => d.column)))
    console.log(columns)

    const x = d3.scaleBand()
      .range([ 0, width ])
      .domain(columns)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()

    // Build Y scales and axis:
    const y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(rows)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()

    // Build color scale
  console.log(domainMin)
    console.log(domainMax)
    const myColor = d3.scaleSequential(d3.interpolateInferno).domain([domainMin,domainMax])

    // create a tooltip
    const tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event:any,d:any) {
      tooltip
        .style("opacity", 1)
      //@ts-ignore
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    const mousemove = function(event:any,d:any)  {
      console.log(d)
      tooltip
        .html("The exact value of<br>this cell is: " + data[d].value)
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2 + "px")
    }
    const mouseleave = function(event:any,d:any) {
      tooltip
        .style("opacity", 0)
      //@ts-ignore
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }
    console.log(data)
    svg.selectAll()
      .data(data, function(d:any) {return d.row+':'+d.column;})
      .enter()
      .append("rect")
      //@ts-ignore
      .attr("x", function(d:any) { return x(d.column) })
      //@ts-ignore
      .attr("y", function(d:any) { return y(d.row) })
      .attr("width", x.bandwidth() )
      //@ts-ignore
      .attr("height", y.bandwidth() ).style("fill", function(d) { return myColor(d.value)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

  }

  verifyMaxDomainInterval(maxDomain:number,data:any) {
    if(maxDomain === undefined || maxDomain === null) {
      const newMaxDomain = data.sort((a:any,b:any)=>b.value-a.value)[0].value;
      return newMaxDomain;
    }
    else
      return maxDomain;
  }
  verifyMinDomainInterval(minDomain:number, data:any) {
    if (minDomain === undefined || minDomain === null) {
      const newMinDomain = data.sort((a: any, b: any) => a.value - b.value)[0].value;
      return newMinDomain;
    } else
      return minDomain;
  }

  }
