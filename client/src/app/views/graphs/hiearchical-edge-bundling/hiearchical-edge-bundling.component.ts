// @ts-nocheck
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Illustration } from "../../../../types/illustration.model";
import { IllustrationService } from "../../../services/illustration.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as d3 from 'd3';
@Component({
  selector: 'app-hiearchical-edge-bundling',
  templateUrl: './hiearchical-edge-bundling.component.html',
  styleUrls: ['./hiearchical-edge-bundling.component.css']
})

export class HiearchicalEdgeBundlingComponent implements OnInit {
  private links = [];
  private nodes = [];
  private graph = { nodes: [], links: [] };
  private chartSvg: any;
  private diameter: any;
  private tooltipMaxWidth = 500;
  @Input()
  data: any;
  constructor(private illustrationService: IllustrationService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.links = this.data.links;
    // @ts-ignore
    this.nodes = this.data.nodes;
    //@ts-ignore
    this.graph = { links: this.links, nodes: this.nodes }
    this.createHedge()
  }


  private createHedge() {
    const colorin = '#00f';
    const colorout = '#f00';


    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'my-tooltip')
      .style('visibility', 'hidden')
      .style('max-width', this.tooltipMaxWidth + 'px')
      .style('word-wrap', 'break-word')
      .text('tooltip');
    this.computeDimensions();
    const radius = this.diameter / 2;
    const innerRadius = radius - 200;
    const cluster = d3.cluster()
      .size([360, innerRadius]);

    const line = d3.lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius(d => d.y)
      .angle(d => d.x / 180 * Math.PI);


    const svg = d3.select('#viz').append('svg')
      .attr('id', 'hedgeBundleSvg')
      .attr('width', this.diameter)
      .attr('height', this.diameter)
      .attr('class', 'edge-bundle')
      .append('g')
      .attr('transform', 'translate(' + radius + ',' + radius + ')');

    const root = packageHierarchy(this.graph.nodes)
      .sum((d: any) => d.size);
    cluster(root);


    let link = svg.append('g').selectAll('.link');
    let node = svg.append('g').selectAll('.node');
    node = node
      .data(root.leaves())
      .enter().append('text')
      .attr('class', 'node')
      .attr('dy', '0.31em')
      .attr('transform', (d: any) => 'rotate(' + (d.x - 90) + ')translate(' + (d.y + 8) + ',0)' + (d.x < 180 ? '' : 'rotate(180)'))
      .attr('text-anchor', (d: any) => d.x < 180 ? 'start' : 'end')
      .style('fill', colorin)
      .style('font', ' 300 11px "Helvetica Neue", Helvetica, Arial, sans-serif')
      .text(d => d.data.key)
      .on('mouseover', onNodeMouseOver)
      .on('mouseout', onNodeOrLinkMouseOut)
      .on('mousemove', onMouseMove)
      .on('click', (d: any) => {
        tooltip.style('visibility', 'hidden');
      });
    link = link
      .data(createLinks(root.leaves(), this.graph.links))
      .enter().append('path')
      .each((d: any) => {
        d.source = d[0], d.target = d[d.length - 1];
      })
      .attr('class', 'link')
      .attr('d', line)
      .style('stroke', 'steelblue')
      .style('stroke-opacity', 0.4)
      .style('fill', 'none')
      .on('mouseover', onLinkMouseOver)
      .on('mousemove', onMouseMove)
      .on('mouseout', onNodeOrLinkMouseOut);

    function onMouseMove() {
      tooltip.style('opacity', 1);
      return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
    }
    function onNodeOrLinkMouseOut(d: any) {
      link
        .style('stroke', 'steelblue')
        .style('stroke-opacity', 0.4)
        .style('stroke-width', '1px');

      node
        .style('fill', '#bbb')
        .style('font-weight', 300);

      tooltip.style('visibility', 'hidden');
    }
    function onNodeMouseOver(d: any) {
      node
        .each((n: any) => {
          n.target = n.source = false;
        });

      link
        .classed('link--target', (l: any) => {
          if (l.target === d) {
            return l.source.source = true;
          }
        })
        .classed('link--source', (l: any) => {
          if (l.source === d) {
            return l.target.target = true;
          }
        })
        .filter((l: any) => l.target === d || l.source === d)
        .style('stroke', (l: any) => {
          if (l.target === d) {
            return colorout;
          } else if (l.source === d) {
            return colorin;
          } else {
            return 'steelblue';
          }
        })
        .style('stroke-opacity', (l: any) => {
          if (l.target === d || l.source === d) {
            return 1;
          }
        })
        .style('stroke-width', (l: any) => {
          if (l.target === d || l.source === d) {
            return '3px';
          }
        })
        .raise();

      node
        .classed('node--target', (n: any) => n.target)
        .classed('node--source', (n: any) => n.source)
        .style('fill', (n: any) => {
          if (n.target) {
            return colorin;
          } else if (n.source) {
            return colorout;
          } else if (n === d) {
            return '#000';
          } else {
            return '#bbb';
          }
        })
        .style('font-weight', (n: any) => {
          if (n.target || n.source || d === n) {
            return 700;
          }
        });

      // tooltipReciever(d.data.key);
      // tooltip.html(() => {
      //   const aux = name;
      //   for (let i = 0; i < name.length; i++) {
      //   aux[i] = name[i] + ' : ' +  values[i];
      //   }
      //   return aux;
      // });

      // return tooltip.style('visibility', 'visible').style('opacity', 1);
    }
    function onLinkMouseOver(l: any) {
      node
        .each((n: any) => {
          n.target = n.source = false;
        });

      l.source.source = true;
      l.target.target = true;
      link
        .filter((lnk: any) => l === lnk)
        .style('stroke-opacity', (lnk: any) => 1)
        .style('stroke-width', (lnk: any) => '3px')
        .raise();

      node
        .classed('node--target', (n: any) => n.target)
        .classed('node--source', (n: any) => n.source)
        .style('fill', (n: any) => {
          if (n.target) {
            return colorin;
          } else if (n.source) {
            return colorout;
          } else {
            return '#bbb';
          }
        })
        .style('font-weight', (n: any) => {
          if (n.target || n.source) {
            return 700;
          }
        });

      tooltip.html(l.value);
      return tooltip.style('visibility', 'visible').style('opacity', 1);
    }

    function packageHierarchy(nodes) {
      const map = {};
      map['@root'] = {
        name: '@root',
        children: [],
        parent: null,
        key: '@root'
      };
      function assignToComponents(d) {
        const component = '#' + d.group;
        let componentNode = map[component];
        if (!componentNode) {
          componentNode = {
            name: component,
            key: component,
            parent: map['@root'],
            children: []
          };
          componentNode.parent.children.push(componentNode);
          map[component] = componentNode;
        }
        const n = {
          name: d.id,
          parent: componentNode,
          key: d.id
        };

        componentNode.children.push(n);
        return n;
      }


      nodes.forEach(d => {
        assignToComponents(d);
      });
      return d3.hierarchy(map['@root']);
    }

    function createLinks(nodes, links) {
      const map = {};
      const imports = [];

      // Compute a map from name to node.
      nodes.forEach(d => {
        map[d.data.name] = d;
      });
      // For each import, construct a link from the source to target node.
      links.forEach(lnk => {
        let _import;
        if (lnk.source === null || lnk.source === undefined) {
          _import = map[lnk.source].path(map[lnk.target]);

        } else {
          const source = map[lnk.source];
          const target = map[lnk.target];
          _import = source.path(target);
        }
        _import.value = lnk.value;
        imports.push(_import);
      });

      return imports;
    }
  }


  // onResize($event) {
  //   this.removeGraph();
  //   this.createHedge(this.httpClient, this.projectId, this.entityType, this.toolTipList);
  //   this.chartSvg = document.getElementById('hedgeBundleSvg');
  // }
  private computeDimensions() {
    this.diameter = window.innerHeight;
  }


}
