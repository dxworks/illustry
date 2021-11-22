import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';


import * as d3 from 'd3';
import { IllustrationService } from "../../../services/illustration.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Illustration } from "../../../../types/illustration.model";


export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface GraphNode {
  name: string;
  group?: number;
  formatting?: FormattingRule;
}

export interface GraphLink {
  source: string;
  target: string;
  value?: number;
  formatting?: FormattingRule;
}

export interface FormattingRule {
  properties: string;
  color: string;
  form: FormTypes;
}

export enum FormTypes {
  CIRCLE = 'circle',
  SQUARE = 'square',
  OVAL = 'oval',
  RECTANGLE = 'rectangle',
  RHOMBUS = 'rhombus'
}

@Component({
  selector: 'app-d3-force-layout-graph',
  templateUrl: './force-layout-graph.component.html',
  styleUrls: ['./force-layout-graph.component.css'],

})
export class ForceLayoutGraphComponent implements OnInit, OnDestroy {
  //@ts-ignore
  @ViewChild('chart', { static: false }) private chartContainer: Renderer2;
  private chartSvg: any;
  private diameter = 100;
  private tooltipMaxWidth = 500;
  private toolTip: any;
  private node: any;
  private links = [];
  private nodes = [];
  private graph = { nodes: [], links: [] };
  @Input()
  data: any;
  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnDestroy() {
    this.removeGraph();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.links = this.data.links;
    // @ts-ignore
    this.nodes = this.data.nodes;
    //@ts-ignore
    this.graph = { links: this.links, nodes: this.nodes }
    this.createForcedLayeredGraph()
    this.DrawLegend(this.graph.nodes, 70, 20)

  }

  private createForcedLayeredGraph() {

    const width = window.innerWidth;
    const height = 800;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    let label = {
      nodes: [],
      links: []
    };



    this.graph.nodes.forEach((d, i) => {
      // @ts-ignore
      label.nodes.push({ node: d });
      // @ts-ignore
      label.nodes.push({ node: d });
      label.links.push({
        // @ts-ignore
        source: i * 2,
        // @ts-ignore
        target: i * 2 + 1
      });
    });

    const labelLayout = d3.forceSimulation(label.nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('link', d3.forceLink(label.links).distance(0).strength(2));
    const graphLayout = d3.forceSimulation(this.graph.nodes)
      .force('charge', d3.forceManyBody().strength(-3000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(1))
      .force('y', d3.forceY(height / 2).strength(1))
      // @ts-ignore
      .force('link', d3.forceLink(this.graph.links).id(d => d.id).distance(50).strength(1))
      .on('tick', ticked);
    // @ts-ignore
    const adjlist = [];

    this.graph.links.forEach(d => {
      // @ts-ignore
      adjlist[d.source.index + '-' + d.target.index] = true;
      // @ts-ignore
      adjlist[d.target.index + '-' + d.source.index] = true;
    });
    // @ts-ignore
    function neigh(a, b) {
      // @ts-ignore
      return a === b || adjlist[a + '-' + b];
    }


    const svg = d3.select('#viz').append('svg').attr('width', width).attr('height', height).attr('id', 'forced-graph');
    const container = svg.append('g');

    svg.call(
      // @ts-ignore
      d3.zoom()
        .scaleExtent([.1, 4])
        .on('zoom', () => {
          container.attr('transform', d3.event.transform);
        })
    );

    const link = container.append('g').attr('class', 'links')
      .selectAll('line')
      .data(this.graph.links)
      .enter()
      .append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', '1px');

    const node = container.append('g').attr('class', 'nodes')
      .selectAll('g')
      .data(this.graph.nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      // @ts-ignore
      .attr('fill', d => color(d.group));

    node.on('mouseover', focus).on('mouseout', unfocus);

    // @ts-ignore
    node.call(
      // @ts-ignore
      d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

    const labelNode = container.append('g').attr('class', 'labelNodes')
      .selectAll('text')
      .data(label.nodes)
      .enter()
      .append('text')
      // @ts-ignore
      .text((d: any, i: any) => i % 2 === 0 ? '' : d.node.id)
      .style('fill', '#555')
      .style('font-family', 'Arial')
      .style('font-size', 12)
      .style('pointer-events', 'none')
      .style('visibility', 'hidden'); // to prevent mouseover/drag capture

    node.on('mouseover', focus).on('mouseout', unfocus);

    function ticked() {

      node.call(updateNode);
      link.call(updateLink);

      labelLayout.alphaTarget(0.3).restart();
      labelNode.each(function (d, i) {
        // @ts-ignore
        if (i % 2 === 0) {
          // @ts-ignore
          d.x = d.node.x;
          // @ts-ignore
          d.y = d.node.y;
        } else {
          const b = this.getBBox();
          // @ts-ignore
          const diffX = d.x - d.node.x;
          // @ts-ignore
          const diffY = d.y - d.node.y;

          const dist = Math.sqrt(diffX * diffX + diffY * diffY);

          let shiftX = b.width * (diffX - dist) / (dist * 2);
          shiftX = Math.max(-b.width, Math.min(0, shiftX));
          const shiftY = 16;
          this.setAttribute('transform', 'translate(' + shiftX + ',' + shiftY + ')');
        }
      });
      labelNode.call(updateNode);

    }

    function fixna(x: any) {
      if (isFinite(x)) {
        return x;
      }
      return 0;
    }

    function focus(d: any) {
      // @ts-ignore
      const index = d3.select(d3.event.target).datum().index;
      // @ts-ignore
      node.style('opacity', o => neigh(index, o.index) ? 1 : 0.1);
      // @ts-ignore
      labelNode.attr('display', o => neigh(index, o.node.index) ? 'block' : 'none').style('visibility', 'visible');
      // @ts-ignore
      link.style('opacity', o => o.source.index === index || o.target.index === index ? 1 : 0.1);
    }

    function unfocus() {
      labelNode.attr('display', 'block').style('visibility', 'hidden');
      node.style('opacity', 1);
      link.style('opacity', 1);
    }

    function updateLink(auxLink: any) {
      auxLink.attr('x1', (d: any) => fixna(d.source.x))
        .attr('y1', (d: any) => fixna(d.source.y))
        .attr('x2', (d: any) => fixna(d.target.x))
        .attr('y2', (d: any) => fixna(d.target.y));
    }

    function updateNode(auxNode: any) {
      auxNode.attr('transform', (d: any) => 'translate(' + fixna(d.x) + ',' + fixna(d.y) + ')');
    }
    // @ts-ignore
    function dragstarted(d) {
      d3.event.sourceEvent.stopPropagation();
      if (!d3.event.active) {
        graphLayout.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }
    // @ts-ignore
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    // @ts-ignore
    function dragended(d) {
      if (!d3.event.active) {
        graphLayout.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

  }

  private removeGraph() {
    d3.select('#forced-graph').remove();
  }
  private DrawLegend(nodes: any, width: number, height: number) {
    const groups: string[] = Array.from(new Set(nodes.map((d: any) => d.group)));
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const legend = d3.select('#legend')
      .append('g')
      .attr('transform', 'translate(' + (width) + ',' + (height) + ')')
      .selectAll('g')
      .data(groups)
      .enter()
      .append('g');
    legend.append('rect')
      .attr('fill', (d, i) => color(d))
      .attr('height', 15)
      .attr('width', 15);

    legend.append('text')
      .attr('x', 18)
      .attr('y', 10)
      .attr('dy', '.15em')
      .style("fill", function (d: any) { return color(d.group) })
      .text((d, i) => { return `Group:${d}` })
      .style('text-anchor', 'start')
      .style('font-size', 12);

    // Now space the groups out after they have been appended:
    const padding = 10;
    legend.attr('transform', function (d, i) {
      return 'translate(' + (d3.sum(groups, function (e, j) {
        if (j < i) { return legend.nodes()[j].getBBox().width; } else { return 0; }
      }) + padding * i) + ',0)';
    });
  }
}
