// import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
// import {FileData} from '../../../entities/file-data';
// import {Tag} from '../../../entities/tag';
// import {isNull, isNullOrUndefined} from 'util';
// import {CurrentProjectService} from '../../../services/current-project.service';
// import {Subscription} from 'rxjs/Subscription';
//
// @Component({
//   selector: 'dx-treemap-filter-wrapper',
//   templateUrl: './treemap-filter-wrapper.component.html',
//   styleUrls: ['./treemap-filter-wrapper.component.scss']
// })
// export class TreemapFilterWrapperComponent implements OnInit, OnDestroy {
//
//   @Input()
//   files: FileData[] = [];
//
//   @Input()
//   isProjectTreemap: boolean;
//   @Output()
//   filteredFiles: EventEmitter<string[]> = new EventEmitter<string[]>();
//   @Output()
//   activeProperty: EventEmitter<Tag> = new EventEmitter<Tag>();
//   @ViewChild('propertiesContainer')
//   propertiesContainer: ElementRef;
//   @ViewChildren('propertySpan')
//   propertySpan: QueryList<ElementRef>;
//   allProjectProperties: Tag[] = [];
//   propertiesArray: Tag[] = [];
//   componentProperties = new Set<string>();
//   selectedProperty: Tag = null;
//   selectedPropertyData: any = {};
//   showMoreProperties = false;
//   displayShowPropertiesArrow = false;
//   selectedCategory: string;
//   categories: { category: string, fqn: string }[] = [];
//   categoriesMap: Map<string, string[]> = new Map<string, string[]>();
//   superCategories: string[];
//   superCategoriesMap: Map<string, { category: string, fqn: string }[]> = new Map<string, { category: string, fqn: string }[]>();
//   readonly DX_CATEGORY: string = 'Code Activity';
//   readonly CHANGES_PROPERTY: string = 'Changes';
//   private allFilesPaths: string[];
//   private subscription: Subscription;
//   private treemapSubscription: Subscription;
//   private propertyFiles: any = {};
//   private queryFiles: any = {};
//
//   constructor(private currentProjectService: CurrentProjectService) {
//   }
//
//   private _customQueryInputModel = 'file: ';
//
//   get customQueryInputModel() {
//     return this._customQueryInputModel;
//   }
//
//   @Input()
//   set customQueryInputModel(customQueryInputModel: string) {
//     if (customQueryInputModel === 'file: ') {
//       this.queryFiles = {};
//       this.updateColor(this.selectedProperty);
//     }
//   }
//
//   ngOnInit() {
//     this.subscription = this.currentProjectService.$project
//       .subscribe((project) => {
//         if (!isNullOrUndefined(project)) {
//           this.allProjectProperties = project.tags;
//           if (!this.isProjectTreemap) {
//             this.getRequiredProperties();
//           } else {
//             this.propertiesArray = this.allProjectProperties;
//           }
//           this.mapPropertiesToCategory();
//           this.createSuperCategoriesMap();
//           this.setInitialActiveProperty();
//         }
//       });
//   }
//
//   ngOnDestroy() {
//     if (!isNullOrUndefined(this.subscription)) {
//       this.subscription.unsubscribe();
//     }
//     if (!isNullOrUndefined(this.treemapSubscription)) {
//       this.treemapSubscription.unsubscribe();
//     }
//   }
//
//   selectProperty(prop: string) {
//     for (const property of this.propertiesArray) {
//       if (prop === property.name) {
//         this.selectedProperty = property;
//         this.activeProperty.emit(this.selectedProperty);
//         // this.sliderRange.value = [this.selectedProperty.low, this.selectedProperty.medium];
//         this.updateColor(this.selectedProperty);
//         break;
//       }
//     }
//   }
//
//   selectCategory(cat: string) {
//     for (const category of this.categories) {
//       if (category.category === cat) {
//         this.selectedCategory = category.category;
//       }
//     }
//     setTimeout(() => {
//       this.calculateWidth();
//     }, 10);
//   }
//
//   updateColor(prop: Tag) {
//     this.propertyFiles = {};
//     this.selectedPropertyData = {};
//     if (isNullOrUndefined(this.allFilesPaths)) {
//       this.allFilesPaths = this.files.map(filedata => filedata.path);
//     }
//     Array.from(Object.keys(prop.data)).forEach(fileName => {
//       if (this.allFilesPaths.indexOf(fileName) !== -1) {
//         this.selectedPropertyData[fileName] = this.getShadeForPropertyValue(prop, prop.data[fileName].value);
//       }
//     });
//
//     this.propertyFiles = this.selectedPropertyData;
//     this.joinResults();
//   }
//
//   joinResults() {
//     const result: any = {};
//     const filteredFiles = Object.keys(this.propertyFiles);
//
//     if (Object.keys(this.propertyFiles).length === 0) {
//       this.filteredFiles.emit(this.queryFiles);
//       return;
//     }
//     if (Object.keys(this.queryFiles).length === 0) {
//       this.filteredFiles.emit(this.propertyFiles);
//       return;
//     }
//
//     if (Object.keys(this.queryFiles).length === 1 && !isNullOrUndefined(this.queryFiles['noResultsWhereReturned'])) {
//       this.filteredFiles.emit([]);
//       return;
//     }
//
//     const joinedFiles = filteredFiles.filter(value => !isNullOrUndefined(this.queryFiles[value]));
//     joinedFiles.forEach(value => {
//       result[value] = this.propertyFiles[value];
//     });
//
//     this.filteredFiles.emit(result);
//   }
//
//   onCustomQueryResults(queryResults: { type: string, resultsNo: number, results: string[] }) {
//     if (isNull(queryResults)) {
//       return;
//     }
//
//     this.queryFiles = {};
//     this.selectedPropertyData = {};
//     this.files.forEach(file => {
//       if (!isNullOrUndefined(queryResults) && queryResults.results.indexOf(file.path) !== -1) {
//         if (!isNullOrUndefined(this.selectedProperty.data[file.path])) {
//           this.selectedPropertyData[file.path] = this.getShadeForPropertyValue(this.selectedProperty, this.selectedProperty.data[file.path]);
//         }
//       }
//     });
//
//     this.queryFiles = this.selectedPropertyData;
//
//     if (queryResults.resultsNo === 0) {
//       this.queryFiles = {'noResultsWhereReturned': 'ok'};
//     }
//
//     this.joinResults();
//   }
//
//   private getShadeForPropertyValue(prop: Tag, value: any) {
//     if (value < prop.low) {
//       return 'light';
//     }
//     if (value > prop.medium) {
//       return 'dark';
//     }
//     return 'medium';
//   }
//
//   private mapPropertiesToCategory() {
//     this.categoriesMap = new Map<string, string[]>();
//     this.categories = [];
//
//     this.propertiesArray.filter(tag => {
//       if (isNullOrUndefined(tag.data)) {
//         return false;
//       } else {
//         for (const filePath of Array.from(Object.keys(tag.data))) {
//           const fileData = this.files.find(file => file.path === filePath);
//           if (!isNullOrUndefined(fileData) && !fileData.isIgnored) {
//             return Array.from(Object.keys(tag.data)).length !== 0;
//           }
//         }
//       }
//       return false;
//     }).forEach((property, index, array) => {
//
//       if (!property.fullyQualifiedName.startsWith('quality')) {
//         if (!isNullOrUndefined(array.find(value => value.fullyQualifiedName === 'quality.' + property.fullyQualifiedName))) {
//           return;
//         }
//       }
//
//       const propArray = this.categoriesMap.get(property.category);
//       if (isNullOrUndefined(propArray)) {
//         this.categories.push({category: property.category, fqn: property.fullyQualifiedName});
//         this.categoriesMap.set(property.category, [property.name]);
//       } else {
//         propArray.push(property.name);
//       }
//     });
//
//     this.categoriesMap.forEach(value => value.sort());
//
//     this.categories.sort((a, b) => {
//       if (a.category > b.category) {
//         return 1;
//       }
//       if (a.category < b.category) {
//         return -1;
//       }
//       return 0;
//     });
//   }
//
//   private createSuperCategoriesMap() {
//     this.superCategoriesMap.set('Others', []);
//     this.categories.forEach(category => {
//       if (category.category.includes('.')) {
//         const superCategory = category.category.substring(0, category.category.indexOf('.'));
//         const exists = this.superCategoriesMap.get(superCategory);
//         if (!exists) {
//           this.superCategoriesMap.set(superCategory, [category]);
//         }
//       } else {
//         this.superCategoriesMap.get('Others').push(category);
//       }
//     });
//     this.superCategories = Array.from(this.superCategoriesMap.keys());
//   }
//
//   private setInitialActiveProperty() {
//     const dxCategory = this.categoriesMap.get(this.DX_CATEGORY);
//     if (!isNullOrUndefined(dxCategory)) {
//       dxCategory.forEach(propertyName => {
//         if (propertyName === this.CHANGES_PROPERTY) {
//           this.selectedCategory = this.DX_CATEGORY;
//           for (const property of this.propertiesArray) {
//             if (propertyName === property.name) {
//               this.selectedProperty = property;
//               this.activeProperty.emit(this.selectedProperty);
//               // this.sliderRange.value = [this.selectedProperty.low, this.selectedProperty.medium];
//               this.updateColor(this.selectedProperty);
//             }
//           }
//         }
//       });
//     }
//   }
//
//   private getRequiredProperties() {
//     this.files.forEach(file => {
//       Object.keys(file.tags).forEach(key => {
//         this.componentProperties.add(key);
//       });
//     });
//
//     this.propertiesArray = [];
//     this.allProjectProperties.forEach(property => {
//       if (this.componentProperties.has(property.fullyQualifiedName)) {
//         this.propertiesArray.push(property);
//       }
//     });
//   }
//
//   private calculateWidth() {
//     const containerWidth: number = this.propertiesContainer.nativeElement.offsetWidth;
//     let allSpansWidth = 0;
//
//     this.propertySpan.forEach(span => {
//       allSpansWidth += span.nativeElement.offsetWidth;
//     });
//     this.displayShowPropertiesArrow = allSpansWidth >= containerWidth / 1.5;
//   }
// }
