import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { MatrixTypes } from 'src/app/entities/matrix-types';
@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  @Input()
  data: MatrixTypes | undefined;

  selectedGroup1: any[] = []
  selectedGroup2: any[] = []
  links: any[] = []
  tableString: string = "";
  divShowData: any;
  switching: any;
  groups: string[] = [];
  clicked: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
    if (this.data) {
      this.switching = -1;
      this.groups = Array.from(new Set(this.data.nodes.map((d: any) => { return d.group })))
      this.selectedGroup1 = Array.from(new Set(this.data.nodes.map((d: any) => { if (d.group === this.groups[0]) return d }))).filter((el: any) => { return el !== undefined });
      this.selectedGroup2 = Array.from(new Set(this.data.nodes.map((d: any) => { if (d.group === this.groups[1]) return d }))).filter((el: any) => { return el !== undefined });
      this.links = Array.from(new Set(this.data.links.map((d: any) => { return d }))).filter((el: any) => { return el !== undefined })
      this.createMatrix()
    }
  }
  ngOnDestroy(): void {
    console.log("matrix destroyed")
    d3.select('showData').remove()
  }
  private createRightHeaderString(spacesForEmptyTd: number, headers: any[]) {
    var thead = "<thead>"
    let firstRow = thead + `<tr id="header" >`
    let empty = firstRow
    empty = `<th><button type="button" id= "magicbutton" class="btn btn-primary magicbutton">Hide values</button></th>`
    for (let i = 0; i < spacesForEmptyTd; i++) {
      empty = empty + `<th style="width: 10%;"> </th>`
    }
    let headerCell = empty;
    headers.forEach((header) => {
      let postHeaderCell = `<th `;
      let savedName = `>${header.name}</th>`
      if (header.style) {
        postHeaderCell = postHeaderCell + `style="${Object.entries(header.style).map(([k, v]) => `${k}:${v}`).join(';')};width:10%;text-align:center;"` + savedName
        headerCell = headerCell + postHeaderCell;

      }
      else {
        postHeaderCell = postHeaderCell + `style="font-weight:bold; width: 10%;text-align:center;"`
        headerCell = headerCell + postHeaderCell;
      }
    })
    const finalRightHeaders = `${headerCell}</tr></thead>`
    return finalRightHeaders;
  }

  private createRightPropertiesString(spacesForEmptyTd: number, properties: any[], group2: any[]) {
    let finalProduct = ""
    properties.forEach((prop: any) => {
      let row = `<tr>`;
      let empty = row;
      for (let i = 0; i < spacesForEmptyTd - 1; i++) {
        empty = empty + '<td style= "width: 10%;"></td>';
      }
      let propCell = empty + `<td class="sortableCol" style="font-weight: bold; width: 10%; cursor: pointer;text-align:center;">${prop}</td>`;
      finalProduct = finalProduct + propCell + "<td></td>" + this.populateRightPropertiesString(group2, prop) + "</tr>";
    })
    return `${finalProduct}`
  }

  private populateRightPropertiesString(group2: any[], property: any) {
    let finalProduct = ""
    group2.forEach((g2: any) => {
      let pRow = `<td class="tooltipRight"`
      g2.properties.forEach((g2P: any) => {
        if (g2P.label === property && g2P.style) {
          if (g2P.tooltip) {
            pRow = pRow + `style=${Object.entries(g2P.style).map(([k, v]) => `${k}:${v}`).join(';')};text-align:center; >${g2P.value}<span class="tooltiptext">${Object.entries(g2P.tooltip).map(([k, v]) => `${k}:${v}</br>`).join(' ')}</span></td>`
            finalProduct = finalProduct + pRow;
          }
          else {
            pRow = pRow + `style=${Object.entries(g2P.style).map(([k, v]) => `${k}:${v}`).join(';')};text-align:center; >${g2P.value}</td>`
            finalProduct = finalProduct + pRow;
          }
        }
        else if (!g2P.style) {
          pRow = pRow + `style = "width:10%;text-align:center;">${g2P.value} </td>`
          finalProduct = finalProduct + pRow;
        }
      })
    })
    return finalProduct
  }

  private createLeftHeaderString(propertiesLeftArray: string[]) {
    let finalProduct = ""
    let row = "<tr>"
    let empty = row + `<td style="width: 10%"></td>`
    finalProduct = finalProduct + empty
    propertiesLeftArray.forEach((pLA: any) => {
      let leftHeaders = `<td class="sortableRow " style ="font-weight:bold;width: 10%; cursor: pointer; text-align:center;">${pLA} </td>`
      finalProduct = finalProduct + leftHeaders;
    })
    return `${finalProduct}</tr>`
  }

  private populateLeftString(group1: any[], group2: any[], links: any, propertiesLeftArray: string[]) {
    let finalProduct = "";
    group1.forEach((g1) => {
      let row = `<tr class = "sortus">`
      let firstCol = row + `<td style = "font-weight:bold;width: 10%;text-align:center;">${g1.name}</td>`;
      finalProduct = finalProduct + firstCol
      g1.properties.forEach((g1P: any) => {
        propertiesLeftArray.forEach((p: any) => {
          if (g1P.label === p && g1P.style) {
            if (g1P.tooltip) {
              let col = `<td class="tooltipLeft" style = "${Object.entries(g1P.style).map(([k, v]) => `${k}:${v}`).join(';')} width:10%;text-align:center;" >${g1P.value}<span class="tooltiptext">${Object.entries(g1P.tooltip).map(([k, v]) => `${k}:${v}</br>`).join(' ')}</span> </td>`
              finalProduct = finalProduct + col;
            }
            else {
              let col = `<td class="tooltipLeft" style = "${Object.entries(g1P.style).map(([k, v]) => `${k}:${v}`).join(';')} width:10%;text-align:center;" >${g1P.value}</td>`
              finalProduct = finalProduct + col;
            }
          }
          else
            if (g1P.label === p) {
              let col = firstCol + `<td style = "width:10%;text-align:center;">${g1P.value} </td>`
              finalProduct = finalProduct + col;
            }
        })
      })
      group2.forEach((g2) => {
        finalProduct = finalProduct + this.populateRightString(g1.name, g2.name, links)
      })
      finalProduct = finalProduct + '</tr>'
    })
    return `${finalProduct} </tbody>`
  }

  private populateRightString(group1Name: string, group2Name: string, links: any) {

    let finalProduct = ""
    const link = Array.from(new Set(links)).map((d: any) => { if (d.source === group1Name && d.target === group2Name) return d }).filter((el: any) => { return el !== undefined })[0];
    if (link && this.clicked === false) {
      let rRow = '<td class="tooltipLinks"'
      if (link.tooltip) {
        rRow = rRow + `style= ${Object.entries(link.style).map(([k, v]) => `${k}:${v}`).join(';')};width:10%;text-align:center;>${link.value}<span class="tooltiptext">${Object.entries(link.tooltip).map(([k, v]) => `${k}:${v}</br>`).join(' ')}</span></td>`
        finalProduct = finalProduct + rRow
      }
      else {
        rRow = rRow + `style= ${Object.entries(link.style).map(([k, v]) => `${k}:${v}`).join(';')};width:10%;text-align:center;>${link.value}</td>`
        finalProduct = finalProduct + rRow
      }
      if (!link.style) {
        rRow = rRow + ">" + link.value + "</td>";
        finalProduct = finalProduct + rRow
      }
    }
    else if ((!link && (this.clicked === false || this.clicked === true))) {
      finalProduct = finalProduct + "<td></td>"
    }
    else if (link && this.clicked === true) {
      let rRow = '<td class="tooltipLinks"'
      rRow = rRow + `style= ${Object.entries(link.style).map(([k, v]) => `${k}:${v}`).join(';')};width:10%;text-align:center;></td>`
      finalProduct = finalProduct + rRow
      if (!link.style) {
        rRow = rRow + ">" + "</td>";
        finalProduct = finalProduct + rRow
      }
    }
    return finalProduct
  }

  private sortTable(n: any) {
    var table: any,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      sortusRows,
      switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      sortusRows = table.getElementsByClassName("sortus")
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = rows.length - sortusRows.length; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        var cmpX = isNaN(parseInt(x.innerHTML)) ? x.innerHTML.toLowerCase() : parseInt(x.innerHTML);

        var cmpY = isNaN(parseInt(y.innerHTML)) ? y.innerHTML.toLowerCase() : parseInt(y.innerHTML);

        if (dir == "asc") {
          if (parseInt(cmpX) > parseInt(cmpY)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (parseInt(cmpX) < parseInt(cmpY)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  private createHeadersAndPropertiesString(group1: any[], group2: any[], links: any[]) {
    let propertiesLeftSet: any = new Set()
    let propertiesRightSet: any = new Set();
    let rightHeaders: string[] = []
    let firstCollumns: string[] = []
    group1.forEach((g1, g1Index) => {
      rightHeaders.push(g1.name);
      g1.properties.forEach((g1P: any) => {
        propertiesLeftSet.add(g1P.label)
      })
    })

    group2.forEach((g2, g2Index) => {
      firstCollumns.push(g2.name);
      g2.properties.forEach((g1P: any) => {
        propertiesRightSet.add(g1P.label)
      })
    })

    const propertiesLeftArray: string[] = Array.from(propertiesLeftSet);
    const propertiesRightArray: string[] = Array.from(propertiesRightSet);
    const rightHeader: string = this.createRightHeaderString(propertiesLeftArray.length, group2);
    const rightProperties: string = this.createRightPropertiesString(propertiesLeftArray.length, propertiesRightArray, group2);
    const leftHeader = this.createLeftHeaderString(propertiesLeftArray);
    const populate = this.populateLeftString(group1, group2, links, propertiesLeftArray);
    const tableString: string = rightHeader + rightProperties + leftHeader + populate
    return tableString
  }

  private sortRows() {
    var sortable = document.querySelectorAll('.sortableRow');
    sortable.forEach((s: any, sIndex) => {
      s.addEventListener('click', (event: any) => {
        this.sortTable(sIndex + 1)
      })
    })
  }

  private sortCollumnsAsc() {
    var sortable = document.querySelectorAll('.sortableCol');

    sortable.forEach((s: any, sIndex) => {
      s.addEventListener('click', (event: any) => {
        var loader = document.getElementById('loader');


        //@ts-ignore
        setTimeout(function () { loader.style.display = 'none'; }, 2000);


        this.selectedGroup2.sort((el1: any, el2: any) => {
          return el1.properties[sIndex].value - el2.properties[sIndex].value
        })
        this.switching = 1
        this.createMatrix()
      })
    })
  }
  private makeNumbersDissapear() {
    var numbers = document.querySelectorAll('#magicbutton');
    var valuesToDissapear = document.querySelectorAll('.tooltipLinks')
    numbers[0].addEventListener('click', (e: any) => {
      this.links.forEach((l: any) => {
        l.value = ""
        l.tooltip = null
      })
      this.createMatrix()
    })
  }
  private isClicked() {
    var numbers = document.querySelectorAll('#magicbutton');
    numbers[0].addEventListener('click', (e: any) => {
      this.clicked = true
      this.createMatrix()
    })
  }
  private isNotClicked() {
    var numbers = document.querySelectorAll('#magicbutton');
    numbers[0].addEventListener('click', (e: any) => {
      this.clicked = false
      this.createMatrix()
    })
  }

  private sortCollumnsDesc() {
    var sortable = document.querySelectorAll('.sortableCol');
    sortable.forEach((s: any, sIndex) => {

      s.addEventListener('click', (event: any) => {

        var loader = document.getElementById('loader');


        //@ts-ignore
        setTimeout(function () { loader.style.display = 'none'; }, 2000);



        this.selectedGroup2.sort((el1: any, el2: any) => {
          return el2.properties[sIndex].value - el1.properties[sIndex].value
        })
        this.switching = -1
        this.createMatrix()
      })
    })
  }
  private createMatrix() {
    const style = `<style>
    .tooltipLinks {
    }
    .tooltipLeft {
    }
    .tooltipRight {
    }
    .tooltipLinks .tooltiptext {
      visibility: hidden;
      width: 10%;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
    
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
    }
    
    .tooltipLinks:hover .tooltiptext {
      visibility: visible;
    }
    .tooltipLeft .tooltiptext {
      visibility: hidden;
      width: 10%;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
    
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
    }
    
    .tooltipLeft:hover .tooltiptext {
      visibility: visible;
    }

    .tooltipRight .tooltiptext {
      visibility: hidden;
      width: 10%;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
    
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
    }
    
    .tooltipRight:hover .tooltiptext {
      visibility: visible;
    }
    .loader {
      position: absolute;
      height: 80px;
      width: 80px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 6px solid lightgrey;
      border-radius: 100%;
      border-top: 6px solid skyblue;
      animation: spin 1s infinite linear;
  }
  @keyframes spin {
      from{
          transform: rotate(0deg);
  }
      to{
          transform: rotate(360deg);
  }
  }
  .up-arrow {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    background: transparent;
    border-bottom: solid 7px black;
    border-top-width: 0;
    cursor: pointer;
}

.down-arrow {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    background: transparent;
    border-top: solid 7px black;
    border-bottom-width: 0;
    margin-top:1px;
    cursor: pointer;
}
.buttonCenter {
   
    text-align: center;  
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
 
}
#magicbutton {
  margin-left: auto;
  margin-right: auto;
}
    </style>`
    const spinner = `<div class="loader" id="loader"></div>`
    //const button = `<button type="button" id= "magicbutton" class="btn btn-primary magicbutton">Hide values</button>`
    this.tableString = `${style}<table id ="myTable" style= "border-spacing: 0;width: 100%;border: 1px solid #ddd";>` + this.createHeadersAndPropertiesString(this.selectedGroup1, this.selectedGroup2, this.links) //+ `</table>` + `<div class="buttonCenter">${button}</div>`;
    this.divShowData = document.getElementById('showData');
    //@ts-ignore
    this.divShowData.innerHTML = this.tableString;
    //this.makeNumbersDissapear()
    this.sortRows()
    if (this.switching === -1) {
      this.sortCollumnsAsc()
    }
    else {
      this.sortCollumnsDesc()
    }
    if (this.clicked === false) {
      this.isClicked()
    }
    else {
      this.isNotClicked()
    }
  }
}

