import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  @Input()
  data: any;

  private width: number;
  private height: number;
  margin = {
    top: 70,
    right: 0,
    bottom: 0,
    left: 70
  };
  constructor() {
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 800 - this.margin.left - this.margin.right

  }

  ngOnInit(): void {
    this.createMatrix(this.data)
  }


  private createMatrix(data: any) {
    // @ts-ignore
    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(d3.range(10));
    var opacity = d3.scaleLinear()
      .domain([0, 10])
      //.range([0.25, 3])
      .clamp(true);
    var x = d3.scaleBand()
      .rangeRound([0, 890 - this.margin.left - this.margin.right])
      .paddingInner(0.1)
      .align(0);
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr("font", '10px sans-serif')
      .append("g")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    var graph = data;

    var idToNode: any = {};
    graph.nodes.forEach(function (n: any) {
      n.degree = 0;
      idToNode[n.id] = n;

    });

    graph.links.forEach(function (e: any) {
      // if(idToNode[e.source]){
      e.source = idToNode[e.source];
      e.target = idToNode[e.target];

      e.source.degree++;
      e.target.degree++;

      // }
    });
    graph.nodes.sort(function (a: any, b: any) {
      return b.group - a.group;
    });

    // @ts-ignore
    x.domain(d3.range(graph.nodes.length));
    // // @ts-ignore
    // opacity.domain([0, d3.max(graph.nodes, function (d) { return d.degree; })]);

    var matrix = graph.nodes.map(function (outer: any, i: any) {
      outer.index = i;
      return graph.nodes.map(function (inner: any, j: any) {
        return { i: i, j: j, val: i === j ? inner.degree : 0 };
      });
    });

    graph.links.forEach(function (l: any) {
      matrix[l.source.index][l.target.index].val += l.value;
      matrix[l.target.index][l.target.index].val += l.value;
      matrix[l.source.index][l.source.index].val += l.value;
      matrix[l.target.index][l.source.index].val += l.value;
    });
    var row = svg.selectAll('g.row')
      .data(matrix)
      .enter().append('g')
      .attr('class', 'row')
      .attr('transform', function (d, i: any) { return 'translate(0,' + x(i) + ')'; })
      .each(makeRow);

    row.append('text')
      .attr('class', 'label')
      .attr('fill', '#999')
      .attr('font-size', '8px')
      .attr('text-anchor', 'end')
      .attr('x', -4)
      .attr('y', x.bandwidth() / 2)
      .attr('dy', '0.32em')
      .text(function (d, i) { return graph.nodes[i].id; });
    var column = svg.selectAll('g.column')
      .data(matrix)
      .enter().append('g')
      .attr('class', 'column')
      .attr('transform', function (d, i: any) { return 'translate(' + x(i) + ', 0)rotate(-90)'; })
      .append('text')
      .attr('class', 'label')
      .attr('fill', '#999')
      .attr('font-size', '8px')
      .attr('text-anchor', 'start')
      .attr('x', 4)
      .attr('y', x.bandwidth() / 2)
      .attr('dy', '0.32em')
      .text(function (d, i) { return graph.nodes[i].id; });

    function makeRow(rowData: any) {
      //@ts-ignore
      var cell = d3.select(this).selectAll('rect')
        .data(rowData)
        .enter().append('rect')
        // .attr('class', 'cell')
        //@ts-ignore
        .attr('x', function (d: any, i) { return x(i); })
        .attr('fill', '#eee')
        .attr('stroke', '#000')
        .attr('stroke-width', 0.5)
        .attr('width', x.bandwidth())
        .attr('height', x.bandwidth())
        //@ts-ignore
        // .style('fill-opacity', function (d:any) {if(d.val>0)  {console.log("aici");return opacity(d.val);} })
        .style('fill', function (d: any) {
          if (d.val > 0 && graph.nodes[d.i].group === graph.nodes[d.j].group) {

            return color(graph.nodes[d.i].group);
          } else if (d.val > 0) {
            return '#555';
          } else {
            return null;
          }

        })
        .on('mouseover', function (d) {

          //@ts-ignore
          row.filter(function (_, i) { return d.i === i; })
            .selectAll('text')
            .style('fill', '#d62333')
            .style('font-weight', 'bold');
          //@ts-ignore
          column.filter(function (_, j) { return d.j === j; })
            .style('fill', '#d62333')
            .style('font-weight', 'bold');
        })
        .on('mouseout', function () {
          row.selectAll('text')
            .style('fill', null)
            .style('font-weight', null);
          column
            .style('fill', null)
            .style('font-weight', null);
        });
      cell.append('title')
        .text(function (d) {

          //@ts-ignore
          return graph.nodes[d.i].id;
        });
    }

  }
}
