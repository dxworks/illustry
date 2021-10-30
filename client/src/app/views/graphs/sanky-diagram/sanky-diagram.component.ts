import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3'
import * as d3Sankey from 'd3-sankey'
import {range} from "rxjs";

@Component({
  selector: 'app-sanky-diagram',
  templateUrl: './sanky-diagram.component.html',
  styleUrls: ['./sanky-diagram.component.css']
})
export class SankyDiagramComponent implements OnInit {
  width = 954;
  height = 600;
  links = [];
  nodes = [];
  color: any;
  graph = {nodes: [], "links": [], units: ""};
  nodeAlign: any;
  nodeGroup:any;
  @Input()
  data: any;

  constructor() {
  }

  ngOnInit(): void {
    this.links = this.data.links;
    console.log(this.links);
    // @ts-ignore
    this.nodes = this.data.nodes;
    console.log(this.nodes);
    //@ts-ignore
    this.graph = {links: this.links, nodes: this.nodes};
    console.log(this.graph)
    this.nodeAlign = pickNodeAlign("justify")
    this.DrawChart(this.graph,this.nodeAlign)
  }


  private DrawChart(energy: any, nodeAlign: any) {

    console.log(energy)
    var svg = d3.select('#sankey')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 500);

    var formatNumber = d3.format(",.0f"),
      format = function (d: any) { return formatNumber(d) + " TWh"; },
      color = d3.scaleOrdinal(d3.schemeCategory10)

    var sankey = d3Sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .nodeAlign(nodeAlign)
      .extent([[1, 1], [1000 - 1, 500 - 6]]);

    var link = svg.append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("path");

    var node = svg.append("g")
      .attr("class", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g");

    const uid = `O-${Math.random().toString(16).slice(2)}`;

    sankey(energy);


    // @ts-ignore
    link = link
      .data(energy.links)
      .enter().append("path")
      // @ts-ignore
      .attr("d", d3Sankey.sankeyLinkHorizontal())
      .attr("stroke", (d:any) =>  `${uid}-link-${d.index}`)
      .attr("stroke-width", function (d: any) { return Math.max(1, d.width); })
      .style("mix-blend-mode", "multiply");

    link.append("title")
      .text(function (d: any) { return d.source.name +  "→" + d.target.name + "\n" + format(d.value); });

    // @ts-ignore
    node = node
      .data(energy.nodes)
      .enter().append("g");

    node.append("rect")
      .attr("x", function (d: any) { return d.x0; })
      .attr("y", function (d: any) { return d.y0; })
      .attr("height", function (d: any) { return d.y1 - d.y0; })
      .attr("width", function (d: any) { return d.x1 - d.x0; })
      .attr("fill", function (d: any) { return color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000")
      .attr("fill", (d:any) => color(d.group));

    node.append("text")
      .attr("x", function (d: any) { return d.x0 - 6; })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function (d: any) { return d.name; })
      .filter(function (d: any) { return d.x0 < 1000 / 2; })
      .attr("x", function (d: any) { return d.x1 + 6; })
      .attr("text-anchor", "start");

    node.append("title")
      .text(function (d: any) { return d.name + "\n" + format(d.value); });

    link
      .append("linearGradient")
    //@ts-ignore
      .attr("id", (d:any) => `${uid}-link-${d.index}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d:any) => d.source.x1)
      .attr("x2", (d:any) => d.target.x0)
      .call(gradient =>
      gradient.append("stop")
        .attr("offset", "0%")
        // @ts-ignore
        .attr("stop-color", (d:any) =>{color(d.source.group) }))
      .call(gradient => gradient.append("stop")
        .attr("offset", "0%")
        // @ts-ignore
        .attr("stop-color", (d:any) => color(d.target.group)))

    // .call(gradient => gradient.append("stop")
      //   .attr("offset", "100%")
      //   // @ts-ignore
      //   .attr("stop-color", ({target: {index: i}}) => color(G[i])))
    return Object.assign(svg.node(), {scales: {color}});
  }

}

function pickNodeAlign(nodeAlign:any) {
  if (nodeAlign === 'left') {
    return  d3Sankey.sankeyLeft
  } else if (nodeAlign === 'right') {
    return d3Sankey.sankeyRight
  } else if (nodeAlign === 'center')
    return d3Sankey.sankeyCenter
  else
    return d3Sankey.sankeyJustify
}
