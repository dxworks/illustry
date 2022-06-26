import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { HierarchicalEdgeBundlingService } from 'src/app/services/hierarchical-edge-bundling.service';
import { NodeLink } from 'types/illustrations';

@Component({
  selector: 'app-hiearchical-edge-bundling',
  templateUrl: './hiearchical-edge-bundling.component.html',
  styleUrls: ['./hiearchical-edge-bundling.component.css'],
})
export class HiearchicalEdgeBundlingComponent implements OnInit {
  @Input()
  data: NodeLink | undefined;
  constructor(
    private hierarchicalEdgeBundlingService: HierarchicalEdgeBundlingService
  ) {}

  ngOnDestroy(): void {
    this.hierarchicalEdgeBundlingService.removeGraph();
  }
  ngOnInit(): void {
    if (this.data) {
      this.hierarchicalEdgeBundlingService.createHedge(this.data);
    }
    console.log(this.data);
  }
}
