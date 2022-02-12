import {Component, Input, OnInit} from '@angular/core';
import {Timeline} from "../../../entities/timeline";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input()
  data: Timeline = {}
  Object = Object

  constructor() {
  }

  ngOnInit(): void {
  }

  searchTermListener() {
    // http.get('...').subscribe(d => this.data = d)
  }

}
