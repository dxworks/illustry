import { Component, Input, OnInit, Output } from '@angular/core';
import { SankeyTypes } from "../../../entities/sankey-types";
import { Link, Node } from "../../../entities/common-types";
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import * as _ from 'lodash';


@Component({
  selector: 'app-sanky-diagram',
  templateUrl: './sanky-diagram.component.html',
  styleUrls: ['./sanky-diagram.component.css']
})
export class SankyDiagramComponent implements OnInit {
  width = 954;
  height = 600;
  links: Link[] = [];
  nodes: Node[] = [];
  color: any;
  graph: SankeyTypes = { nodes: [], links: [] };
  nodeAlign: any;

  @Input()
  data: any

  @Output()
  option!: EChartsOption;
  constructor() {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.nodes = this.data.nodes;
    // // @ts-ignore
    // this.nodes.map((node, i) => node['index'] = i)
    // @ts-ignore
    // this.links = this.modifyLinks(this.nodes, this.data.links);
    //@ts-ignore
    this.graph = { links: this.data.links, nodes: this.nodes, colorMapping: this.data.colorMapping };
    // this.nodeAlign = pickNodeAlign("justify")
    this.DrawChart(this.graph)
    // this.DrawLegend(this.graph.nodes, 70, 20)
  }


  // private DrawLegend(nodes: any, width: number, height: number) {
  //   const groups: string[] = Array.from(new Set(nodes.map((d: any) => d.group)));
  //   const color = d3.scaleOrdinal(d3.schemeCategory10)

  //   const legend = d3.select('#legend')
  //     .append('g')
  //     .attr('transform', 'translate(' + (width) + ',' + (height) + ')')
  //     .selectAll('g')
  //     .data(groups)
  //     .enter()
  //     .append('g');
  //   legend.append('rect')
  //     .attr('fill', (d, i) => color(d))
  //     .attr('height', 15)
  //     .attr('width', 15);

  //   legend.append('text')
  //     .attr('x', 18)
  //     .attr('y', 10)
  //     .attr('dy', '.15em')
  //     .style("fill", function (d: any) { return color(d.group) })
  //     .text((d, i) => { return `Group:${d}` })
  //     .style('text-anchor', 'start')
  //     .style('font-size', 12);

  //   // Now space the groups out after they have been appended:
  //   const padding = 10;
  //   legend.attr('transform', function (d, i) {
  //     return 'translate(' + (d3.sum(groups, function (e, j) {
  //       if (j < i) { return legend.nodes()[j].getBBox().width; } else { return 0; }
  //     }) + padding * i) + ',0)';
  //   });
  // }
  private DrawChart(energy: any) {
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom, 'vintage');
    console.log(energy)
    this.option = {

      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        //@ts-ignore
        formatter: function (params) {
          console.log(params)
          //@ts-ignore
          return `<div>12</div>`
        }
      },
      legend: {
        show: true
      },
      animation: false,
      series: [
        {
          type: 'sankey',
          emphasis: {
            focus: 'adjacency'
          },
          nodeAlign: 'right',
          data: this.createNodes(energy.nodes, energy.colorMapping),
          links: energy.links,
          lineStyle: {
            color: 'source',
            curveness: 0.5
          }
        }
      ]
    }
    console.log(this.createNodes(energy.nodes, energy.colorMapping))
    this.option && myChart.setOption(this.option);
  }

  createNodes(nodes: any[], colors: any[]) {
    let finalNodes: any = []
    _.forEach(colors, color => {

      _.each(color, function (cval: any, ckey: any) {
        console.log(ckey)
        _.forEach(nodes, node => {
          if (ckey === node.group) {

            finalNodes.push({
              name: node.id, itemStyle: {
                color: cval,
                borderColor: cval
              }
            })
          }
        })
      })
    })
    return finalNodes
  }
  //     var svg = d3.select('#sankey')
  //       .append('svg')
  //       .attr('width', 1000)
  //       .attr('height', 600);

  //     var formatNumber = d3.format(",.0f"),
  //       format = function (d: any) { return formatNumber(d) + " TWh"; },
  //       color = d3.scaleOrdinal(d3.schemeCategory10)

  //     var sankey = d3Sankey.sankey()
  //       .nodeWidth(15)
  //       .nodePadding(10)
  //       .nodeAlign(nodeAlign)
  //       .extent([[300, 10], [1000 - 1, 500 - 6]]);


  //     const uid = `O-${Math.random().toString(16).slice(2)}`;


  //     sankey(energy);

  //     energy.links.forEach((link: any) => {
  //       link.gradient = { id: `${uid}${Math.random().toString(16).slice(2)}` }
  //       link.path = { id: `${uid}${Math.random().toString(16).slice(2)}` }
  //     });
  //     energy.nodes.forEach((node: any) => {
  //       node.color = color(node.group);
  //     });
  //     const defs = svg.append("defs");
  //     const gradients = defs.selectAll("linearGradient")
  //       .data(energy.links)
  //       .enter()
  //       .append("linearGradient")
  //       .attr("id", (d: any) => d.gradient.id)
  //     console.log(gradients)
  //     gradients.append("stop").attr("offset", 0.0).attr("stop-color", (d: any) => d.source.color);
  //     gradients.append("stop").attr("offset", 1.0).attr("stop-color", (d: any) => d.target.color);
  //     const view = svg.append("g")
  //       .classed("view", true)
  //       .attr("transform", `translate(10, 10)`);
  //     const nodes = view.selectAll("rect.node")
  //       .data(energy.nodes)
  //       .enter()
  //       .append("rect")
  //       .classed("node", true)
  //       .attr("id", (d: any) => `node-${d.index}`)
  //       .attr("x", (d: any) => d.x0)
  //       .attr("y", (d: any) => d.y0)
  //       .attr("width", (d: any) => d.x1 - d.x0)
  //       .attr("height", (d: any) => Math.max(1, d.y1 - d.y0))
  //       .attr("fill", (d: any) => d.color)
  //       .attr("opacity", 0.9);

  //     nodes.append("title").text((d: any) => `${d.id}\n${format(d.value)}`);


  //     view.selectAll("text.node")
  //       .data(energy.nodes)
  //       .enter()
  //       .append("text")
  //       .classed("node", true)
  //       .attr("x", (d: any) => d.x1)
  //       .attr("dx", 6)
  //       .attr("y", (d: any) => (d.y1 + d.y0) / 2)
  //       .attr("dy", "0.35em")
  //       .attr("fill", "black")
  //       .attr("text-anchor", "start")
  //       .attr("font-size", 10)
  //       .attr("font-family", "Arial, sans-serif")
  //       .text((d: any) => d.id)
  //       .filter((d: any) => d.x1 > 20 / 2)
  //       .attr("x", (d: any) => d.x0)
  //       .attr("dx", -6)
  //       .attr("text-anchor", "end");


  //     const links = view.selectAll("path.link")
  //       .data(energy.links)
  //       .enter()
  //       .append("path")
  //       .classed("link", true)
  //       // @ts-ignore
  //       .attr("d", d3Sankey.sankeyLinkHorizontal())
  //       .attr("stroke", "black")
  //       .attr("stroke-opacity", 0.1)
  //       .attr("stroke-width", (d: any) => Math.max(1, d.width))
  //       .attr("fill", "none");

  //     links.append("title").text((d: any) => `${d.source.id} -> ${d.target.id}\n${format(d.value)}`);


  //     function setDash(link: any) {
  //       let el = view.select(`#${link.path.id}`);

  //       // @ts-ignore
  //       let length = el.node().getTotalLength();
  //       el.attr("stroke-dasharray", `${length}${length}`)
  //         .attr("stroke-dashoffset", length);
  //     }

  //     const gradientLinks = view.selectAll("path.gradient-link")
  //       .data(energy.links)
  //       .enter()
  //       .append("path")
  //       .classed("gradient-link", true)
  //       .attr("id", (d: any) => d.path.id)
  //       // @ts-ignore
  //       .attr("d", d3Sankey.sankeyLinkHorizontal())
  //       //@ts-ignore
  //       .attr("stroke", (d: any) => d.gradient)
  //       .attr("stroke-opacity", 0)
  //       .attr("stroke-width", (d: any) => Math.max(1, d.width))
  //       .attr("fill", "none")
  //       .each(setDash);

  //     function branchAnimate(node: any) {

  //       let links = view.selectAll("path.gradient-link")
  //         .filter((link) => {
  //           return node.sourceLinks.indexOf(link) !== -1;
  //         });
  //       let nextNodes: any = [];
  //       links.each((link: any) => {
  //         nextNodes.push(link.target);
  //       });
  //       links
  //         .attr("stroke", (d: any) => color(d.source.group))
  //         .attr("stroke-opacity", 0.5)
  //         .transition()
  //         // .duration(900)
  //         .ease(d3.easeLinear)
  //         .attr("stroke-dashoffset", 0)
  //         .on("end", () => {
  //           nextNodes.forEach((node: any) => {
  //             branchAnimate(node);
  //           });
  //         });
  //     }

  //     function branchClear() {
  //       gradientLinks.transition();
  //       gradientLinks
  //         .attr("stroke", 0)
  //         .attr("stroke-opactiy", 0)
  //         .each(setDash);
  //     }

  //     nodes.on("mouseover", branchAnimate)
  //       .on("mouseout", branchClear);
  //     console.log(svg.nodes())
  //     return svg.node();
  //   }

  // }

  // function pickNodeAlign(nodeAlign: any) {
  //   if (nodeAlign === 'left') {
  //     return d3Sankey.sankeyLeft
  //   } else if (nodeAlign === 'right') {
  //     return d3Sankey.sankeyRight
  //   } else if (nodeAlign === 'center')
  //     return d3Sankey.sankeyCenter
  //   else
  //     return d3Sankey.sankeyJustify
  // }

  //   modifyLinks(nodes: any, links: any) {
  //     links.forEach((link: any) => {
  //       nodes.forEach((node: any) => {
  //         if (link.source === node.id) {
  //           link.source = node.index
  //         }
  //         if (link.target === node.id) {
  //           link.target = node.index
  //         }

  //       })
  //     })
  //     return links;
  //   }
}
