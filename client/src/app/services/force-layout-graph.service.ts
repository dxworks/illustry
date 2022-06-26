import { Injectable } from "@angular/core";
import * as d3 from 'd3';
import { NodeLink } from "types/illustrations";

@Injectable({ providedIn: 'root' })
export class ForceLayoutGraphService {


  public createForcedLayeredGraph(graph:NodeLink) {
    const width = window.innerWidth;
    const height = 800;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    let label = {
      nodes: [],
      links: [],
    };

     graph.nodes.forEach((d, i) => {
      // @ts-ignore
      label.nodes.push({ node: d });
      // @ts-ignore
      label.nodes.push({ node: d });
      label.links.push({
        // @ts-ignore
        source: i * 2,
        // @ts-ignore
        target: i * 2 + 1,
      });
    });
    const ticked = () => {
      node.call(updateNode);
      link.call(updateLink);

      labelLayout.alphaTarget(0.3).restart();
      labelNode.each(function (d:any, i:any) {
        if (i % 2 === 0) {
          d.x = d.node.x;
          d.y = d.node.y;
        } else {
          const b = this.getBBox();
          const diffX = d.x - d.node.x;
          const diffY = d.y - d.node.y;
          const dist = Math.sqrt(diffX * diffX + diffY * diffY);
          let shiftX = (b.width * (diffX - dist)) / (dist * 2);
          shiftX = Math.max(-b.width, Math.min(0, shiftX));
          const shiftY = 16;
          this.setAttribute(
            'transform',
            'translate(' + shiftX + ',' + shiftY + ')'
          );
        }
      });
      labelNode.call(updateNode);
    };

    const fixna = (x: any) => {
      if (isFinite(x)) {
        return x;
      }
      return 0;
    };

    const updateLink = (auxLink: any) => {
      auxLink
        .attr('x1', (d: any) => fixna(d.source.x))
        .attr('y1', (d: any) => fixna(d.source.y))
        .attr('x2', (d: any) => fixna(d.target.x))
        .attr('y2', (d: any) => fixna(d.target.y));
    };

    const updateNode = (auxNode: any) => {
      auxNode.attr(
        'transform',
        (d: any) => 'translate(' + fixna(d.x) + ',' + fixna(d.y) + ')'
      );
    };
    const dragstarted = (d: any) => {
      d3.event.sourceEvent.stopPropagation();
      if (!d3.event.active) {
        graphLayout.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    };
    const dragged = (d: any) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };
    const dragended = (d: any) => {
      if (!d3.event.active) {
        graphLayout.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    };
    const labelLayout = d3
      .forceSimulation(label.nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('link', d3.forceLink(label.links).distance(0).strength(2));
    const graphLayout = d3
      .forceSimulation(graph.nodes as unknown as any)
      .force('charge', d3.forceManyBody().strength(-3000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(1))
      .force('y', d3.forceY(height / 2).strength(1))
      .force(
        'link',
        d3
          .forceLink(graph.links)
          .id((d: any) => d.id)
          .distance(50)
          .strength(1)
      )
      .on('tick', ticked);
    const adjlist: any = [];

    graph.links.forEach((d: any) => {
      adjlist[d.source.index + '-' + d.target.index] = true;
      adjlist[d.target.index + '-' + d.source.index] = true;
    });
    const neigh = (a: any, b: any) => {
      return a === b || adjlist[a + '-' + b];
    };

    const svg = d3
      .select('#viz')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'forced-graph');
    const container = svg.append('g');

    svg.call(
      // @ts-ignore
      d3
        .zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', () => {
          container.attr('transform', d3.event.transform);
        })
    );

    const link = container
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', '1px');
    const focus = (d: any) => {
      // @ts-ignore
      const index = d3.select(d3.event.target).datum().index;
      node.style('opacity', (o:any) => (neigh(index, o.index) ? 1 : 0.1));
      labelNode
        .attr('display', (o: any) =>
          neigh(index, o.node.index) ? 'block' : 'none'
        )
        .style('visibility', 'visible');
      link.style('opacity', (o: any) =>
        o.source.index === index || o.target.index === index ? 1 : 0.1
      );
    };

    const unfocus = () => {
      labelNode.attr('display', 'block').style('visibility', 'hidden');
      node.style('opacity', 1);
      link.style('opacity', 1);
    };
    const node = container
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', (d) => color(d.group));

    node.on('mouseover', focus).on('mouseout', unfocus);

    node.call(
      // @ts-ignore
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

    const labelNode = container
      .append('g')
      .attr('class', 'labelNodes')
      .selectAll('text')
      .data(label.nodes)
      .enter()
      .append('text')
      .text((d: any, i: any) => (i % 2 === 0 ? '' : d.node.id))
      .style('fill', '#555')
      .style('font-family', 'Arial')
      .style('font-size', 12)
      .style('pointer-events', 'none')
      .style('visibility', 'hidden'); // to prevent mouseover/drag capture

    node.on('mouseover', focus).on('mouseout', unfocus);
  }

  public removeGraph() {
    d3.select('#forced-graph').remove();
  }
  public DrawLegend(nodes: any, width: number, height: number) {
    const groups: string[] = Array.from(
      new Set(nodes.map((d: any) => d.group))
    );
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const legend = d3
      .select('#legend')
      .append('g')
      .attr('transform', 'translate(' + width + ',' + height + ')')
      .selectAll('g')
      .data(groups)
      .enter()
      .append('g');
    legend
      .append('rect')
      .attr('fill', (d, i) => color(d))
      .attr('height', 15)
      .attr('width', 15);

    legend
      .append('text')
      .attr('x', 18)
      .attr('y', 10)
      .attr('dy', '.15em')
      .style('fill', function (d: any) {
        return color(d.group);
      })
      .text((d, i) => {
        return `Group:${d}`;
      })
      .style('text-anchor', 'start')
      .style('font-size', 12);

    // Now space the groups out after they have been appended:
    const padding = 10;
    legend.attr('transform', function (d, i) {
      return (
        'translate(' +
        (d3.sum(groups, function (e, j) {
          if (j < i) {
            return legend.nodes()[j].getBBox().width;
          } else {
            return 0;
          }
        }) +
          padding * i) +
        ',0)'
      );
    });
  }
}
