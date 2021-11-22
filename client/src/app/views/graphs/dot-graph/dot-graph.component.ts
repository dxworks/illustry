import { Component, Input, OnInit } from '@angular/core';
import { graphviz } from 'd3-graphviz';

import { PluginOutputConverterService } from '../../../services/plugin-output-converter.service';
import { GraphData } from "../../../entities/graph-data";
import { isNullOrUndefined } from "@qntm-code/utils";
import * as d3 from 'd3';


@Component({
  selector: 'app-dot-graph',
  templateUrl: './dot-graph.component.html',
  styleUrls: ['./dot-graph.component.scss']
})
export class DotGraphComponent implements OnInit {

  private container: any;

  constructor(private pluginOutputConverter: PluginOutputConverterService) {
  }

  // noinspection TsLint
  private _content = null;

  @Input()
  set content(content: any) {
    const copy = JSON.parse(JSON.stringify(content));
    const newContent = this.pluginOutputConverter.convertToGraph(copy);

    if (!isNullOrUndefined(copy) && newContent !== this._content) {
      // @ts-ignore
      this._content = newContent;
      // @ts-ignore
      graphviz('#highLevelDiagram').renderDot(this._content);
      this.container = document.getElementById('highLevelDiagram');
    }
  }

  ngOnInit() {
  }


}
