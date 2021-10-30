// import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {Tag} from '../../../entities/tag';
// import {isNullOrUndefined} from 'util';
// import {FileData} from '../../../entities/file-data';
// import {CurrentProjectService} from '../../../services/current-project.service';
// import {FilterFilesService} from '../../../services/filter-files.service';
// import {MonacoAppService} from '../../../services/monaco-app.service';
// import {SourceFile} from '../../../entities/source-file';
// import {TreemapSearchService} from '../treemap-search.service';
// import {TreemapService} from '../treemap.service';
// import {TooltipContentService} from '../../../services/tooltip-content.service';
// import {DashboardEntityTypeConstants} from '../../../constants/dx-constants';
// import {Subscription} from 'rxjs/Subscription';
//
// @Component({
//   selector: 'dx-treemap-properties-info',
//   templateUrl: './treemap-properties-info.component.html',
//   styleUrls: ['./treemap-properties-info.component.scss']
// })
// export class TreemapPropertiesInfoComponent implements OnInit, OnDestroy {
//   filesDisplayed: FileProperty[] = [];
//   allFilesWithPropertyValue: FileProperty[] = [];
//   projectFiles: FileData[] = null;
//   sourceFilesMatches: SourceFile[] = [];
//
//   cols = [
//     {header: 'File', field: 'path', width: 90},
//     {header: 'Property Value', field: 'propertyValue', width: 10}
//   ];
//
//   totalRecords: number;
//
//   code = null;
//   editor: any;
//   // lineNumber = 0;
//
//   editorOptions = {
//     theme: 'vs-dark',
//     lineNumbers: 'off',
//     readOnly: true,
//     automaticLayout: true,
//     mouseWheelZoom: true,
//     scrollBeyondLastLine: false,
//     smoothScrolling: true,
//     folding: true,
//   };
//   _property: Tag = null;
//   _coloredFiles: any = null;
//   decorations: string[] = [];
//   private subscription: Subscription;
//   private filterSubscription: Subscription;
//   private treemapSubscription: Subscription;
//
//   constructor(private currentProjectService: CurrentProjectService,
//               private filterFilesService: FilterFilesService,
//               private monacoEditorService: MonacoAppService,
//               private treemapSearchService: TreemapSearchService,
//               private cdRef: ChangeDetectorRef,
//               private treemapService: TreemapService,
//               private tooltipService: TooltipContentService) {
//   }
//
//   get property(): Tag {
//     return this._property;
//   }
//
//   @Input() set property(prop: Tag) {
//     if (!isNullOrUndefined(prop) && !isNullOrUndefined(prop.data)) {
//       this._property = prop;
//       this.allFilesWithPropertyValue = [];
//       const keys = Array.from(Object.keys(prop.data));
//       this.totalRecords = keys.length;
//       keys.forEach((key) => {
//         this.allFilesWithPropertyValue.push({path: key, propertyValue: this.property.data[key].value});
//       });
//       this.filesDisplayed = this.allFilesWithPropertyValue;
//     }
//   }
//
//   get coloredFiles(): any {
//     return this._coloredFiles;
//   }
//
//   @Input() set coloredFiles(ftd: any) {
//     if (!isNullOrUndefined(ftd)) {
//       this._coloredFiles = ftd;
//       this.setFilesDisplayed();
//     }
//   }
//
//   ngOnInit() {
//     this.subscription = this.currentProjectService.$project.subscribe(project => {
//       if (!isNullOrUndefined(project)) {
//         this.projectFiles = project.allFiles;
//         this.setFilesDisplayed();
//       }
//     });
//     this.filterSubscription = this.filterFilesService.refreshTreemapTable.subscribe(refresh => {
//       if (refresh) {
//         this.setFilesDisplayed();
//       }
//     });
//
//     this.treemapSubscription = this.treemapSearchService.$sourceFilesMatches.subscribe(sourceFilesMatches => {
//       if (!isNullOrUndefined(sourceFilesMatches)) {
//         this.sourceFilesMatches = sourceFilesMatches;
//       }
//     });
//   }
//
//   ngOnDestroy() {
//     if (!isNullOrUndefined(this.subscription)) {
//       this.subscription.unsubscribe();
//     }
//     if (!isNullOrUndefined(this.filterSubscription)) {
//       this.filterSubscription.unsubscribe();
//     }
//     if (!isNullOrUndefined(this.treemapSubscription)) {
//       this.treemapSubscription.unsubscribe();
//     }
//   }
//
//   openOverlayPanel(event, path, op) {
//     const overlayFile = this.sourceFilesMatches.find(sourceFile => sourceFile.path === path);
//     if (isNullOrUndefined(overlayFile)) {
//       return;
//     }
//     this.code = overlayFile.content;
//     const index = path.lastIndexOf('.');
//     const extension = path.substring(index, path.length);
//     this.editorOptions = Object.assign({}, this.editorOptions, {language: this.monacoEditorService.getLanguageForExtension(extension)});
//     this.cdRef.detectChanges();
//     this.decorations = this.editor.deltaDecorations(this.decorations, this.getNewDecorations(overlayFile));
//     this.cdRef.detectChanges();
//     op.toggle(event);
//   }
//
//   onEditorInit(editor: any) {
//     this.editor = editor;
//   }
//
//   getTooltip(path: any) {
//     if (!isNullOrUndefined(path)) {
//       const fileData: FileData = this.projectFiles.find(file => file.path === path);
//       if (!isNullOrUndefined(fileData)) {
//         return this.tooltipService.getHtmlTooltipContentForType(fileData, DashboardEntityTypeConstants.FILE, this.currentProjectService.getComponentsOfFile(fileData.path));
//       }
//     }
//     return '';
//   }
//
//   private setFilesDisplayed() {
//     this.filesDisplayed = [];
//     this.allFilesWithPropertyValue.forEach(file => {
//       if (!isNullOrUndefined(this._coloredFiles[file.path]) && !isNullOrUndefined(this.projectFiles) && this.projectFiles.find(f => file.path === f.path && !f.isIgnored) != null) {
//         this.filesDisplayed.push(file);
//       }
//     });
//   }
//
//   private getNewDecorations(overlayFile: SourceFile) {
//     if (isNullOrUndefined(overlayFile)) {
//       return [];
//     }
//     const newDecorations = overlayFile.matches.map(match => {
//       return {
//         range: new monaco.Range(match.startLine, match.startColumn, match.endLine, match.endColumn),
//         options: {inlineClassName: 'myInlineDecoration'}
//       };
//     });
//     return newDecorations;
//   }
// }
//
// interface FileProperty {
//   path: string;
//   propertyValue: number;
// }
