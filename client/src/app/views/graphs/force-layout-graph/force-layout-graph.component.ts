import { Component, Input, OnInit } from '@angular/core';
import { NodeLink } from 'index';
import { ForceLayoutGraphService } from 'src/app/services/force-layout-graph.service';


@Component({
  selector: 'app-d3-force-layout-graph',
  templateUrl: './force-layout-graph.component.html',
  styleUrls: ['./force-layout-graph.component.css'],
})
export class ForceLayoutGraphComponent implements OnInit {
  @Input()
  data: NodeLink | undefined;

  constructor(private forceLayoutGraphService: ForceLayoutGraphService) {}

  ngOnDestroy() {
    console.log('destroyed FLG');
    this.forceLayoutGraphService.removeGraph();
  }

  ngOnInit(): void {
    if (this.data) {
      this.forceLayoutGraphService.createForcedLayeredGraph(this.data);
      this.forceLayoutGraphService.DrawLegend(this.data.nodes, 70, 20);
    }
  }
}
