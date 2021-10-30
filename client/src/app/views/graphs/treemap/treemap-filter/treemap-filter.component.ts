import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from "../../../../entities/tag";


@Component({
  selector: 'dx-treemap-filter',
  templateUrl: './treemap-filter.component.html',
  styleUrls: ['./treemap-filter.component.scss']
})
export class TreemapFilterComponent implements OnInit {
  @Input() property: Tag | undefined; // this is maybe file characteristic
  @Output() savedSelection: EventEmitter<any> = new EventEmitter<any>();
  sliderValue: any = null;

  constructor() {
  }

  ngOnInit() {
  }

  sliderValueChanged(event: any) {
    this.sliderValue = event;
  }

  saveThresholds() {
    this.savedSelection.emit(this.sliderValue);
  }

}
