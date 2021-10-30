// import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, ViewChild} from '@angular/core';
// import * as d3 from 'd3';
// import {saveSvgAsPng} from 'save-svg-as-png';
// import {isNullOrUndefined} from 'util';
// import {ColorPaletteService} from '../../services/color-palette.service';
// import {SidebarService} from '../../services/sidebar.service';
// import {TreemapService} from './treemap.service';
// import {FileData} from '../../entities/file-data';
// import {FilterFilesService} from '../../services/filter-files.service';
// import {TooltipContentService} from '../../services/tooltip-content.service';
// import {CurrentProjectService} from '../../services/current-project.service';
// import {DashboardEntityTypeConstants, ModalSources} from '../../constants/dx-constants';
// import {ComponentConfiguration} from '../../entities/component-configuration';
// import {TagModalService} from '../../shared/filter-modal/tag-modal.service';
// import {Subscription} from 'rxjs/Subscription';
//
// @Component({
//   selector: 'dx-treemap',
//   templateUrl: './treemap.component.html',
//   styleUrls: ['./treemap.component.scss']
// })
// export class TreemapComponent implements OnInit, OnDestroy {
//
//   @ViewChild('ignoreFileModal')
//   ignoreFileModal: ElementRef;
//   @ViewChild('ignoreFolderModal')
//   ignoreFolderModal: ElementRef;
//   @Output()
//   doneLoading: EventEmitter<boolean> = new EventEmitter();
//   _contextMenuComponents: ComponentConfiguration[];
//   _files: FileData[];
//   @Output()
//   componentOfPathChanged: EventEmitter<{ path: string, newComponentFqn: string }> = new EventEmitter();
//   @ViewChild('treemapchart')
//   private chartContainer: ElementRef;
//   private width: number;
//   private height: number;
//   private treemapSvg: any;
//   private maxDepth = 0;
//   private map = {};
//   private tooltipMaxWidth = 500;
//   private lastColor: string;
//   private fileMenu: any;
//   private folderMenu: any;
//   private contextMenu: any;
//   private sidebarSubscription: Subscription;
//   private _filesToColor: any;
//
//   constructor(private treemapService: TreemapService,
//               private colorPaletteService: ColorPaletteService,
//               private sidebarService: SidebarService,
//               private filterFilesService: FilterFilesService,
//               private tooltipService: TooltipContentService,
//               private currentProjectService: CurrentProjectService,
//               private tagModalService: TagModalService) {
//   }
//
//   get contextMenuComponents() {
//     return this._contextMenuComponents;
//   }
//
//   @Optional()
//   @Input()
//   set contextMenuComponents(contextMenuComponents: ComponentConfiguration[]) {
//     this._contextMenuComponents = contextMenuComponents;
//     this.contextMenu = this.createContextMenu();
//   }
//
//   get files() {
//     return this._files;
//   }
//
//   @Input()
//   set files(fls: FileData[]) {
//     if (!isNullOrUndefined(fls)) {
//       this._files = fls;
//       this.removeChart();
//       this.createChart();
//       this.treemapSvg = document.getElementById('treemapSvg');
//     }
//   }
//
//   get filesToColor() {
//     return this._filesToColor;
//   }
//
//   @Input()
//   set filesToColor(ftc: any) {
//     if (!isNullOrUndefined(ftc)) {
//       this._filesToColor = ftc;
//       this.updateColor();
//       this.contextMenu = this.createContextMenu();
//     }
//   }
//
//   @Input()
//   set captureScreenshot(captureScreenshot: boolean) {
//     if (isNullOrUndefined(captureScreenshot)) {
//       return;
//     }
//
//     if (captureScreenshot) {
//       this.saveAsPng();
//     } else {
//       return;
//     }
//   }
//
//   ngOnInit() {
//     this.sidebarSubscription = this.sidebarService.isCollapsed.subscribe(() => this.onResize(''));
//   }
//
//   ngOnDestroy() {
//     this.removeChart();
//     if (!isNullOrUndefined(this.sidebarSubscription)) {
//       this.sidebarSubscription.unsubscribe();
//     }
//   }
//
//   onResize(event: any) {
//     this.removeChart();
//     this.createChart();
//     this.treemapSvg = document.getElementById('treemapSvg');
//   }
//
//   download(filename, text) {
//     const element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', filename);
//
//     element.style.display = 'none';
//     document.body.appendChild(element);
//
//     element.click();
//
//     document.body.removeChild(element);
//   }
//
//   sumBySize(d) {
//     // return d.size;
//     // if (isNullOrUndefined(d.children)) {
//     // return d.size;
//     // } else {
//     //   console.log(d);
//     //   let noOfUndevelopedChildren = 0;
//     //   d.children.forEach( value => {
//     //     if (value.size < 30) {
//     //       noOfUndevelopedChildren ++;
//     //     }
//     //     return d.size + 5 * noOfUndevelopedChildren;
//     //   });
//     // }
//     return d.size < 30 ? 30 : d.size + 30;
//   }
//
//   colorByDepth(d: any) {
//     // const color = d3.color('#e9e9e9');
//     const color = d3.color('#D6CFD8');
//     return color.brighter(d.depth * (0.5 / this.maxDepth)).toString();
//   }
//
//   saveAsPng() {
//     if (!isNullOrUndefined(this.treemapSvg)) {
//       saveSvgAsPng(this.treemapSvg, 'treemap.png');
//     }
//   }
//
//   updateColor() {
//     const self = this;
//
//     d3.selectAll('rect').style('fill', (d: any) => {
//       if (d.children) {
//         return self.colorByDepth(d);
//       }
//       if (!isNullOrUndefined(this.map[d.data.path])) {
//         return this.getColorForFileInfoAndStatus(d.data.path, this.map[d.data.path].status);
//       }
//       return '#FFF';
//     });
//   }
//
//   private getColorForFileInfoAndStatus(fileName: string, status: any): string {
//     if (isNullOrUndefined(fileName) || isNullOrUndefined(this.filesToColor)) {
//       return '#FFF';
//     }
//
//     const val: string = this.filesToColor[fileName];
//     if (isNullOrUndefined(val)) {
//       return '#FFF';
//     }
//
//     if (val.startsWith('#')) {
//       return val;
//     }
//
//     return this.colorPaletteService.getColorShadeForFileStatus(val, status);
//
//   }
//
//   private removeChart() {
//     d3.select('.my-treemap-tooltip').remove();
//     d3.select('.treemap').remove();
//     d3.select('.d3-context-menu').remove();
//   }
//
//   private createChart() {
//     this.width = 98 / 100 * this.chartContainer.nativeElement.offsetWidth;
//     if (this.width !== 0) {
//       this.treemapService.setDefaultWidth(this.width);
//     } else {
//       this.width = this.treemapService.getDefaultWidth();
//     }
//     this.height = 75 / 100 * window.innerHeight;
//     if (isNullOrUndefined(this.files)) {
//       return;
//     }
//     const self = this;
//     let root: any;
//     let node: any;
//     const transitionDuration = 500;
//     const element = this.chartContainer.nativeElement;
//     const chartWidth = this.width;
//     const chartHeight = this.height;
//     const treemap = d3.treemap()
//       .round(false)
//       .size([this.width, this.height])
//       .padding(2);
//
//     // Great way to do a tooltip.
//     const tooltip = d3.select('body')
//       .append('div')
//       .attr('class', 'my-treemap-tooltip')
//       .style('visibility', 'hidden')
//       .style('max-width', this.tooltipMaxWidth + 'px')
//       .style('word-wrap', 'break-word')
//       .text('tooltip');
//
//     // Great way to do a context-menu.
//     this.contextMenu = this.createContextMenu();
//
//
//     const chart = d3.select(element).append('svg')
//       .attr('class', 'treemap')
//       .attr('id', 'treemapSvg')
//       .attr('width', this.width)
//       .attr('height', this.height)
//       .style('margin-left', '10px')
//       .append('g');
//
//
//     root = d3.hierarchy(this.transformData())
//       .eachBefore((d: any) => {
//         d.data.id = d.data.name;
//       })
//       .sum(this.sumBySize);
//
//     treemap(root);
//
//     const cell = chart.selectAll('g')
//       .data(root.descendants())
//       .enter().append('g')
//       .attr('transform', (d: any) => {
//         return 'translate(' + d.x0 + ',' + d.y0 + ')';
//       })
//       .attr('class', (d: any) => {
//         if (d.children) {
//           if (d.depth > self.maxDepth) {
//             self.maxDepth = d.depth;
//           }
//           return 'package';
//         } else {
//           return 'file';
//         }
//       })
//       .on('mouseover', (d: any, i, nodes) => {
//         if (d.children) {
//           d3.select(nodes[i]).select('rect').style('stroke', 'red');
//         }
//       })
//       .on('mouseout', (d: any, i, nodes) => {
//         if (d.children) {
//           d3.select(nodes[i]).select('rect').style('stroke', () => {
//             // return self.colorByDepth(d);
//             return 'lightgray';
//           });
//         }
//       });
//     cell.append('rect')
//       .attr('id', (d: any) => {
//         return d.data.id;
//       })
//       .attr('size', (d: any) => {
//         return d.data.size;
//       })
//       .attr('width', (d: any) => {
//         return Math.max(0.1, d.x1 - d.x0);
//       })
//       .attr('height', (d: any) => {
//         return Math.max(0.1, d.y1 - d.y0);
//       })
//       .style('fill', (d: any) => {
//         if (d.children) {
//           return self.colorByDepth(d);
//         } else {
//           return this.getColorForFileInfoAndStatus(d.data.path, this.map[d.data.path].status);
//         }
//       })
//       .style('stroke', (d: any) => {
//         return 'lightgray';
//       })
//       .on('mouseover', (d: any, i, nodes) => {
//         if (!d.children) {
//           self.lastColor = d3.select(nodes[i]).style('fill');
//           d3.select(nodes[i]).style('fill', 'grey');
//         }
//         tooltip.html('<div class="text-left">' +
//           this.tooltipService.getHtmlTooltipContentForType(this.currentProjectService.getDataOfFilePath(d.data.path, d.data.name),
//             DashboardEntityTypeConstants.FILE, this.currentProjectService.getComponentsOfFile(d.data.path)) + '</div>'
//         );
//         return tooltip.style('visibility', 'visible').style('opacity', 1);
//       })
//       .on('mousemove', () => {
//         tooltip.style('opacity', 1);
//         const tooltipPosition = this.tooltipService.computeTooltipPosition(d3.event, this.tooltipMaxWidth);
//         return tooltip.style('top', tooltipPosition.y + 'px').style('left', tooltipPosition.x + 'px');
//       })
//       .on('mouseout', (d: any, i, nodes) => {
//         tooltip.style('visibility', 'hidden');
//         if (d.children) {
//           return;
//         } else {
//           d3.select(nodes[i]).style('fill', self.lastColor);
//         }
//       })
//       .on('click', (d: any, i, nodes) => {
//         if (!isNullOrUndefined(d.children)) {
//           return;
//         }
//         this.treemapService.goToFile(d.data.path);
//       })
//       .on('contextmenu', this.contextMenu([], () => {
//       }));
//     this.doneLoading.emit(true);
//   }
//
//   private createContextMenu() {
//     const modal = (<any>$('#systemModal'));
//
//     this.fileMenu = [];
//     this.folderMenu = [];
//
//     if (!isNullOrUndefined(this.contextMenuComponents)) {
//       this.fileMenu.push({title: 'Add to new component', action: (elm, d) => this.setFilesToNewComponent(d.data.path)});
//       this.folderMenu.push({
//         title: 'Add to new component',
//         action: (elm, d) => this.setFilesToNewComponent(d.data.name)
//       });
//
//       this.contextMenuComponents.forEach(component => {
//         this.fileMenu.push({
//           title: 'Add to ' + component.fullyQualifiedName, action: (elm, d) => {
//             this.componentOfPathChanged.emit({path: d.data.path, newComponentFqn: component.fullyQualifiedName});
//           }
//         });
//         this.folderMenu.push({
//           title: 'Add to ' + component.fullyQualifiedName, action: (elm, d) => {
//             this.componentOfPathChanged.emit({path: d.data.name, newComponentFqn: component.fullyQualifiedName});
//           }
//         });
//       });
//     } else {
//       this.fileMenu = [
//         {
//           title: 'Ignore file',
//           action: (elm, d) => {
//             if (!isNullOrUndefined(d) && !isNullOrUndefined(d.data) && !isNullOrUndefined(d.data.isIgnored)) {
//               this.tagModalService.$showModal.next({source: ModalSources.IGNORE_FILE, value: d.data.path});
//             }
//           }
//         },
//         {
//           title: 'Ignore parent folder',
//           action: (elm, d, i) => {
//             this.tagModalService.$showModal.next({source: ModalSources.IGNORE_FOLDER, value: d.parent.data.name});
//           }
//         },
//         {
//           title: 'Tag file',
//           action: (elm, d) => {
//             this.tagModalService.$showModal.next({source: ModalSources.TAG_FILE, value: d.data.path});
//           }
//         },
//         {
//           title: 'Go to',
//           action: () => {
//           }
//         }
//       ];
//
//       this.folderMenu = [
//         {
//           title: 'Ignore folder',
//           action: (elm, d) => {
//             this.tagModalService.$showModal.next({source: ModalSources.IGNORE_FOLDER, value: d.data.name});
//           }
//         },
//         {
//           title: 'Tag folder',
//           action: (elm, d) => {
//             this.tagModalService.$showModal.next({source: ModalSources.TAG_FOLDER, value: d.parent.data.name});
//           }
//         }
//       ];
//     }
//
//     return (menu, openCallback) => {
//
//       // create the div element that will hold the context menu
//       d3.selectAll('.d3-context-menu').data([1])
//         .enter()
//         .append('div')
//         .attr('class', 'd3-context-menu');
//
//       // close menu
//       d3.select('body').on('click.d3-context-menu', function () {
//         d3.select('.d3-context-menu').style('display', 'none');
//       });
//
//       // this gets executed when a contextmenu event occurs
//       return (data, index) => {
//         const elm = this;
//
//         if (!isNullOrUndefined(data.data.children)) {
//           menu = this.folderMenu;
//         } else {
//           menu = this.fileMenu;
//         }
//
//         d3.selectAll('.d3-context-menu').html('');
//         const list = d3.selectAll('.d3-context-menu').append('ul');
//         list.selectAll('li').data(menu).enter()
//           .append('li')
//           .html((d: any) => {
//             return (typeof d.title === 'string') ? d.title : d.title(data);
//           })
//           .on('click', (d: any) => {
//             d.action(elm, data, index);
//             // if (d.title !== 'Ignore file')
//             d3.select('.d3-context-menu').style('display', 'none');
//
//           });
//
//         // the openCallback allows an action to fire before the menu is displayed
//         // an example usage would be closing a tooltip
//         if (openCallback) {
//           if (openCallback(data, index) === false) {
//             return;
//           }
//         }
//
//         // display context menu
//         d3.select('.d3-context-menu')
//           .style('left', (d3.event.pageX - 2) + 'px')
//           .style('top', (d3.event.pageY - 2) + 'px')
//           .style('display', 'block');
//
//         d3.event.preventDefault();
//         d3.event.stopPropagation();
//       };
//     };
//   }
//
//   private transformData() {
//     this.map = {};
//     const self = this;
//
//     function find(path, data?) {
//       let node = self.map[path], i;
//       if (!node) {
//         node = self.map[path] = data || {name: path, children: []};
//         if (path.length) {
//           i = path.lastIndexOf('/');
//           if (i === -1) {
//             node.parent = find('');
//           } else {
//             node.parent = find(path.substring(0, i));
//           }
//           node.parent.children.push(node);
//           node.key = path;
//         }
//       }
//       return node;
//     }
//
//     this.files.forEach(function (d) {
//       if (!d.isIgnored) {
//         find(d.path, d);
//       }
//     });
//     const root = this.map[''];
//     root.key = root.name = '/';
//     console.log(this.map['']);
//     return this.map[''];
//   }
//
//   private ignoreFilesWithExtension(d: any) {
//     if (!isNullOrUndefined(d) && !isNullOrUndefined(d.data) && !isNullOrUndefined(d.data.isIgnored)) {
//       const extension = d.data.extension;
//       const excludedFiles = [];
//       if (!isNullOrUndefined(extension)) {
//         this._files.forEach(file => {
//           if (!isNullOrUndefined(file.extension) && file.extension === extension) {
//             file.isIgnored = true;
//             excludedFiles.push(file);
//           }
//         });
//         return excludedFiles;
//       }
//     }
//     return [];
//   }
//
//   private ignoreFolder(d: any) {
//     if (!isNullOrUndefined(d)) {
//       if (isNullOrUndefined(d.children) || d.children.length === 0) {
//         const file = d.data;
//         file.isIgnored = true;
//         return [file];
//       }
//
//       if (!isNullOrUndefined(d.children)) {
//         let filesArray = [];
//         d.children.forEach(n => filesArray = filesArray.concat(this.ignoreFolder(n)));
//         return filesArray;
//       }
//     }
//     return [];
//   }
//
//   private setFilesToNewComponent(path: string) {
//     const modal = (<any>$(document.getElementById('newComponentModal')));
//     let selectedFilePaths: string[] = [];
//     if (path === '/') {
//       selectedFilePaths = this.files.map(value => value.path);
//     } else {
//       this.files.forEach(file => {
//         if (file.path.startsWith(path)) {
//           selectedFilePaths.push(file.path);
//         }
//       });
//     }
//
//     modal.data('files', selectedFilePaths);
//     modal.modal('show');
//   }
// }
