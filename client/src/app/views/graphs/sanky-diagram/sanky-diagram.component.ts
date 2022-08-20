import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import * as _ from 'lodash';
import * as d3 from 'd3';
import { Link,Node, NodeLink } from 'types/illustrations';


@Component({
  selector: 'app-sanky-diagram',
  templateUrl: './sanky-diagram.component.html',
  styleUrls: ['./sanky-diagram.component.css']
})
export class SankyDiagramComponent implements OnInit, OnDestroy {
  myChart: any
  width = 954;
  height = 600;
  links: Link[] = [];
  nodes: Node[] = [];
  color: any;
  graph: NodeLink = { nodes: [], links: [], colorMapping: [] };
  nodeAlign: any;

  @Input()
  data: NodeLink | undefined

  @Output()
  option!: EChartsOption;
  constructor() {
  }
  ngOnDestroy(): void {
    echarts.disconnect
  }
  ngOnInit(): void {
    if (this.data) {
      this.nodes = this.data.nodes;

      this.graph = { links: this.data.links, nodes: this.nodes, colorMapping: this.data.colorMapping };
      // this.nodeAlign = pickNodeAlign("justify")
      this.DrawChart(this.graph)
      this.DrawLegend(this.data.colorMapping, 70, 20)
    }
  }


  private DrawLegend(colorMapping: any, width: number, height: number) {
    if (colorMapping) {
      const legend = d3.select('#legend')
        .append('g')
        .attr('transform', 'translate(' + (width) + ',' + (height) + ')')
        .selectAll('g')
        .data(colorMapping)
        .enter()
        .append('g');
      legend.append('rect')
        //@ts-ignore
        .attr('fill', (d, i) => { return Object.values(d)[0] })
        .attr('height', 15)
        .attr('width', 15);

      legend.append('text')
        .attr('x', 18)
        .attr('y', 10)
        .attr('dy', '.15em')
        .style("fill", function (d: any) { return Object.keys(d)[0] })
        //@ts-ignore
        .text((d, i) => { return `Group:${Object.keys(d)[0]}` })
        .style('text-anchor', 'start')
        .style('font-size', 12);

      // Now space the groups out after they have been appended:
      const padding = 10;
      legend.attr('transform', function (d, i) {
        return 'translate(' + (d3.sum(colorMapping, function (e, j) {
          if (j < i) { return legend.nodes()[j].getBBox().width; } else { return 0; }
        }) + padding * i) + ',0)';
      });
    }
  }
  private DrawChart(energy: any) {
    var chartDom = document.getElementById('main')!;

    this.option = {

      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        //@ts-ignore
        formatter: function (params) {
          //@ts-ignore
          return params.data.prop
        }
      },
      legend: {
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
          links: this.createLinks(energy.links),
          lineStyle: {
            color: 'source',
            curveness: 0.5
          }
        }
      ]
    }
    this.myChart = echarts.getInstanceByDom(chartDom)
    if (this.myChart === null) {
      this.myChart = echarts.init(chartDom);
      this.option && this.myChart.setOption(this.option);
    }
  }

  createNodes(nodes: Node[], colors: any[]) {
    let finalNodes: any = []
    _.forEach(colors, color => {
      _.each(color, (cval: any, ckey: any) => {
        _.forEach(nodes, node => {
          if (ckey === node.group) {
            finalNodes.push({
              name: node.id, itemStyle: {
                color: cval,
                borderColor: cval
              },
              prop: this.createPropertiesForToolTip(node.properties)
            })
          }
        })
      })
    })
    return finalNodes
  }
  createLinks(links: Link) {
    let finalLinks: any = []
    _.forEach(links, link => {
      finalLinks.push({ source: link.source, target: link.target, value: link.value, prop: this.createPropertiesForToolTip(link.properties, link.value) })
    })
    return finalLinks
  }
  createPropertiesForToolTip(properties: any | string, value?: number) {
    let prop: string = ""
    if (typeof properties === 'object') {
      _.each(properties, (value, key) => {
        prop = prop + `<div style = "font-weight: bold">${key}:${value}`;
      })
      if (value) {
        prop = prop + `<div style = "font-weight: bold">value:${value}</div>`
      }
      return prop
    }
    else {
      if (typeof properties === 'string') {
        if (value) {
          prop = prop + properties + `<div style = "font-weight: bold">value:${value}</div>`
          return properties
        }
        else {
          return properties
        }
      }
      else {
        if (value) {
          return `<div style = "font-weight: bold">value:${value}</div>`
        }
        else {
          return ""
        }
      }
    }
  }

}
