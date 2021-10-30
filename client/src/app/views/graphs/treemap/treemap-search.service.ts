// import {Injectable} from '@angular/core';
// import {BehaviorSubject} from 'rxjs';
// import {isArray, isNull, isNullOrUndefined, isUndefined} from 'util';
// import {CurrentProjectService} from '../../services/current-project.service';
// import {SourceFile} from '../../entities/source-file';
//
// @Injectable()
// export class TreemapSearchService {
//   public $searchForFileValue: BehaviorSubject<string>;
//   public $searchInCodeValue: BehaviorSubject<string>;
//   public $fileSize: BehaviorSubject<any>;
//   public $fileAge: BehaviorSubject<any>;
//   public $fileProperties: BehaviorSubject<any>;
//
//   public $sourceFilesMatches: BehaviorSubject<SourceFile[]>;
//   private sourceFilesMatches: SourceFile[] = [];
//
//   constructor(private currentProjectService: CurrentProjectService) {
//     this.$searchForFileValue = new BehaviorSubject<string>('');
//     this.$searchInCodeValue = new BehaviorSubject<string>('');
//     this.$fileSize = new BehaviorSubject<any>({});
//     this.$fileAge = new BehaviorSubject<any>({});
//     this.$fileProperties = new BehaviorSubject<any>({});
//     this.$sourceFilesMatches = new BehaviorSubject<SourceFile[]>(this.sourceFilesMatches);
//   }
//
//   filterTreemapFiles(file: any) {
//     if (file.path.includes(this.$searchForFileValue.getValue())) {
//       const sizeObject = this.$fileSize.getValue();
//       const ageObject = this.$fileAge.getValue();
//       const propertiesObject = this.$fileProperties.getValue();
//
//       return this.compareFilesAttribute(file, sizeObject, 'size')
//         && this.compareFilesAttribute(file, ageObject, 'age')
//         && this.checkIfFileHasProperties(file, propertiesObject)
//         && this.checkIfSourceFileMatches(file);
//     }
//     return false;
//   }
//
//   public searchForMatchesInCode() {
//     if (!isNullOrUndefined(this.$searchInCodeValue.getValue()) && this.$searchInCodeValue.getValue() !== '') {
//       this.currentProjectService.requestSearchInCode(this.$searchInCodeValue.getValue()).subscribe(
//         sourceFilesMatches => {
//           this.sourceFilesMatches = [];
//           this.sourceFilesMatches = sourceFilesMatches;
//           this.$sourceFilesMatches.next(this.sourceFilesMatches);
//         }
//       );
//     } else {
//       this.sourceFilesMatches = [];
//       this.$sourceFilesMatches.next(this.sourceFilesMatches);
//     }
//   }
//
//   private compareFilesAttribute(file: any, comparedObject: any, attribute: string) {
//     if (isNullOrUndefined(comparedObject.value)) {
//       return true;
//     }
//
//     if (isArray(comparedObject.value)) {
//       if (file[attribute] >= comparedObject.value[0] && file[attribute] <= comparedObject.value[1]) {
//         return true;
//       }
//     } else if (comparedObject.isBelowValue && file[attribute] < comparedObject.value) {
//       return true;
//     } else if (comparedObject.isBelowValue === false && file[attribute] > comparedObject.value) {
//       return true;
//     }
//     return false;
//   }
//
//   private checkIfFileHasProperties(file: any, propertiesObject: any) {
//     if (!isNullOrUndefined(propertiesObject) && !isNullOrUndefined(file)) {
//
//       const selectedProperties = propertiesObject.properties;
//       const thresholdsMap = propertiesObject.thresholdsMap;
//
//       if (!isNullOrUndefined(selectedProperties) && !isNullOrUndefined(thresholdsMap)) {
//         if (selectedProperties.length === 0) {
//           /** Here is the problem */
//           return true;
//         }
//         for (const property of selectedProperties) {
//           if (!isUndefined(thresholdsMap.get(property.name))) {
//             const filePropertyValue = property.data[file.path];
//             const thresholdValueObject = thresholdsMap.get(property.name);
//
//             if (!isNullOrUndefined(filePropertyValue) && isNull(thresholdValueObject)) {
//               return true;
//             } else if (!isNullOrUndefined(filePropertyValue) && !isNullOrUndefined(thresholdValueObject)) {
//               if (isNullOrUndefined(thresholdValueObject.value)) {
//                 return true;
//               }
//
//               if (isArray(thresholdValueObject.value)) {
//                 if (filePropertyValue > thresholdValueObject.value[0] && filePropertyValue < thresholdValueObject.value[1]) {
//                   return true;
//                 }
//               } else if (thresholdValueObject.isBelowValue && filePropertyValue < thresholdValueObject.value) {
//                 return true;
//               } else if (thresholdValueObject.isBelowValue === false && filePropertyValue > thresholdValueObject.value) {
//                 return true;
//               }
//             }
//           }
//         }
//       } else {
//         return true;
//       }
//
//       return false;
//     }
//   }
//
//   private checkIfSourceFileMatches(file: any) {
//     if (isNullOrUndefined(this.sourceFilesMatches) || this.sourceFilesMatches.length === 0) {
//       return true;
//     }
//
//     for (const sourceFile of this.sourceFilesMatches) {
//       if (sourceFile.path === file.path) {
//         return true;
//       }
//     }
//     return false;
//   }
// }
