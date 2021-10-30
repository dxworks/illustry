// import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
// import {Tag} from '../../../entities/tag';
// import {isNullOrUndefined, isUndefined} from 'util';
// import 'jquery';
//
// @Component({
//   selector: 'dx-treemap-property-filter',
//   templateUrl: './treemap-property-filter.component.html',
//   styleUrls: ['./treemap-property-filter.component.scss']
// })
// export class TreemapPropertyFilterComponent implements OnInit {
//   @Output() activeProperties: EventEmitter<any> = new EventEmitter();
//
//   @Input() properties: Tag[];
//   modalProperty: Tag = null;
//   selectedProperties: Tag[] = [];
//   sliderValue: any = null;
//   propertyThresholdsMap: Map<string, any> = new Map<string, any>();
//   @ViewChild('thresholdModal')
//   private thresholdModal: ElementRef;
//
//   constructor() {
//   }
//
//   ngOnInit() {
//   }
//
//   selectProperty(event: any) {
//     const clickedItem = event.itemValue;
//     const activeItems = event.value;
//     this.modalProperty = null;
//
//     if (!isNullOrUndefined(clickedItem) && !isNullOrUndefined(activeItems)) {
//       for (const activeItem of activeItems) {
//         if (activeItem !== clickedItem) {
//           continue;
//         } else {
//           this.modalProperty = clickedItem;
//           (<any>$(this.thresholdModal.nativeElement)).modal({backdrop: 'static', keyboard: false});
//         }
//       }
//       if (isNullOrUndefined(this.modalProperty)) {
//         if (!isUndefined(this.propertyThresholdsMap.get(clickedItem.name))) {
//           this.propertyThresholdsMap.delete(clickedItem.name);
//           this.activeProperties.emit({properties: this.selectedProperties, thresholdsMap: this.propertyThresholdsMap});
//         }
//       }
//     } else if (this.selectedProperties.length === 0) {
//       this.propertyThresholdsMap.clear();
//       this.activeProperties.emit({properties: this.selectedProperties, thresholdsMap: this.propertyThresholdsMap});
//     } else if (isNullOrUndefined(clickedItem) && !isNullOrUndefined(this.selectedProperties)) {
//       this.selectedProperties.forEach(property => {
//         if (isNullOrUndefined(this.propertyThresholdsMap.get(property.name))) {
//           this.propertyThresholdsMap.set(property.name, null);
//         }
//       });
//
//       this.activeProperties.emit({properties: this.selectedProperties, thresholdsMap: this.propertyThresholdsMap});
//     }
//   }
//
//   sliderValueChanged(event: any) {
//     this.sliderValue = event;
//   }
//
//   saveThresholds() {
//     if (!isNullOrUndefined(this.modalProperty) && !isNullOrUndefined(this.sliderValue)) {
//       this.propertyThresholdsMap.set(this.modalProperty.name, this.sliderValue);
//       this.activeProperties.emit({properties: this.selectedProperties, thresholdsMap: this.propertyThresholdsMap});
//     }
//   }
//
//   savePropertyWithoutThresholds() {
//     if (!isNullOrUndefined(this.modalProperty)) {
//       this.propertyThresholdsMap.set(this.modalProperty.name, null);
//       this.activeProperties.emit({properties: this.selectedProperties, thresholdsMap: this.propertyThresholdsMap});
//     }
//   }
// }
