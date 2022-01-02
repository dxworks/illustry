import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {
  @Input()
  data: any;

 
  constructor() {
 
  }

  ngOnInit(): void {

    this.createMatrix(this.data)
  }
  
// private createRightHeader(spacesForEmptyTd:number, headers:any[],table:any) {

//   var thead = document.createElement("thead");
//   table.appendChild(thead);
//   let firstRow = thead.insertRow(-1)
//   for(let i = 0; i <spacesForEmptyTd+1; i++) {
//     let empty = firstRow.insertCell(-1);
//     empty.style.cssText = 'width: 10%'
//   }
//   headers.forEach((header) => {
//     let headerCell = document.createElement("th");
//     headerCell.innerHTML = header.name;
//     if(header.style) {
     
//     headerCell.style.cssText =  Object.entries(header.style).map(([k, v]) => `${k}:${v}`).join(';')  
//      headerCell.style.cssText =  headerCell.style.cssText+'width:10%;'
//     }
//     else
//     {
//       header.style.cssText = "font-weight:bold; width: 10%"
//     }
//     firstRow.appendChild(headerCell)
//   })
// }
private createRightHeaderString(spacesForEmptyTd:number, headers:any[],table:any) {

  var thead = "<thead>"
 
  let firstRow = thead+`<tr id="header" >`
  let empty = firstRow
  for(let i = 0; i <spacesForEmptyTd+1; i++) {
    empty = empty+ `<th style="width: 10%;"> </th>`
  }
  let headerCell = empty;
  headers.forEach((header) => {
    let postHeaderCell =`<th `;
    let savedName = `>${header.name}</th>`
    if(header.style) {
     
      postHeaderCell = postHeaderCell + `style="${Object.entries(header.style).map(([k, v]) => `${k}:${v}`).join(';')};width:10%;"` +savedName
      headerCell = headerCell+postHeaderCell;
      
    }
    else
    {
      postHeaderCell = postHeaderCell + `style="font-weight:bold; width: 10%"`
      headerCell = headerCell+postHeaderCell;
    }
    
  })
  const finalRightHeaders = `${headerCell}</tr></thead>`
  return finalRightHeaders;
}

// private createRightProperties(spacesForEmptyTd:number,properties:any[],table:any,group2:any[]) {
  
//   properties.forEach((prop:any) => {
//     let row = table.insertRow(-1)
//     for(let i = 0; i< spacesForEmptyTd-1;i++) {
//       let empty = row.insertCell(-1);
//       empty.style.cssText = 'width: 10%'
//     }
//     let propCell = row.insertCell(-1);
//     propCell.innerHTML= prop;
//     propCell.style.cssText = "font-weight:bold; width: 10%";
//     row.insertCell(-1); 
//     this.populateRightProperties(group2,prop,row)
//   })
// }

private createRightPropertiesString(spacesForEmptyTd:number,properties:any[],table:any,group2:any[]) { 
  let finalProduct = ""
  properties.forEach((prop:any) => {
    let row = "<tr>";
    let empty = row;
    for(let i = 0; i< spacesForEmptyTd-1;i++) {
       empty = empty+ '<td style= "width: 10%;"></td>';
      }
       let propCell = empty+ `<td style="font-weight: bold; width: 10%;">${prop}</td>` ;
       finalProduct = finalProduct +propCell +"<td></td>" + this.populateRightPropertiesString(group2,prop) + "</tr>";
  })

  return `${finalProduct}`
}

 
// private populateRightProperties(group2:any[],property:any, row:any) {   
//     group2.forEach((g2:any)=>{  
//     let pRow = row.insertCell(-1)
//     g2.properties.forEach((g2P:any) => {
//       if(g2P.label ===property && g2P.style){

//         pRow.innerHTML = g2P.value;
//         pRow.style.cssText = Object.entries(g2P.style).map(([k, v]) => `${k}:${v}`).join(';')  
//       }
//     })
//   })
// }

private populateRightPropertiesString(group2:any[],property:any) {
  let finalProduct= ""
  group2.forEach((g2:any) => {
    let pRow = '<td '
    g2.properties.forEach((g2P:any) => {
      if(g2P.label ===property && g2P.style) {
        pRow = pRow + `style=${Object.entries(g2P.style).map(([k, v]) => `${k}:${v}`).join(';') }>${g2P.value}</td>`
        finalProduct = finalProduct+pRow;
      }
    })
  })
  return finalProduct
}
// private createLeftHeader(spacesForEmptyTR:number,propertiesLeftArray:string[], table:any) {

//   let row = table.insertRow(-1);
//   let empty = row.insertCell(-1);
//   empty.style.cssText = 'width: 10%'
//   propertiesLeftArray.forEach((pLA:any) => {
//     let leftHeaders = row.insertCell(-1)
//     leftHeaders.innerHTML = pLA;
//     leftHeaders.style.cssText = "font-weight:bold;width: 10%;"
  
//   })
// }
 
private createLeftHeaderString(spacesForEmptyTR:number,propertiesLeftArray:string[], table:any) {
  let finalProduct = ""
  let row = "<tr>"
  let empty = row+`<td style="width: 10%"></td>`
  finalProduct = finalProduct +empty
  propertiesLeftArray.forEach((pLA:any) => {
    let leftHeaders = `<td class="sortableLeft" style ="font-weight:bold;width: 10%;">${pLA}</td>`
    finalProduct = finalProduct + leftHeaders;
  })
  return `${finalProduct}</tr>`
}

// private populateLeft(group1:any[],group2:any[],links:any,propertiesLeftArray:string[], table:any) {
//   group1.forEach((g1) => {
//     let row = table.insertRow(-1);
//     let firstCol = row.insertCell(-1);
//     firstCol.innerHTML = g1.name;
//     firstCol.style.cssText = "font-weight:bold;width: 10%;"
//     g1.properties.forEach((g1P:any) => { 
//       propertiesLeftArray.forEach((p:any) => {
//         if(g1P.label === p) {
//           let col = row.insertCell(-1);
//           col.innerHTML = g1P.value
//           if(g1P.style) {
 
//             col.style.cssText =Object.entries(g1P.style).map(([k, v]) => `${k}:${v}`).join(';')  
//             col.style.cssText =  col.style.cssText+'width:10%;'
//           }
//         }
//       })
//     })
//     this.populateRight(g1.name,group2,links,row)
//   })
// } 
private populateLeftString(group1:any[],group2:any[],links:any,propertiesLeftArray:string[], table:any) {
  let finalProduct = "";
  group1.forEach((g1) => {
    let row = `<tr class = "sortus">`
    let firstCol = row +`<td style = font-weight:bold;width: 10%;>${g1.name}</td>`;
    finalProduct = finalProduct +firstCol
    g1.properties.forEach((g1P:any) => { 
      propertiesLeftArray.forEach((p:any) => {
        if(g1P.label === p && g1P.style) {
          let col = `<td style = ${Object.entries(g1P.style).map(([k, v]) => `${k}:${v}`).join(';')} width:10%;>${g1P.value} </td>`
          finalProduct = finalProduct + col;  
        }
        else 
        if(g1P.label === p) {
          let col = firstCol + `<td style = width:10%;>${g1P.value} </td>`
          finalProduct = finalProduct + col;  
        }       
      })
    })
    finalProduct = finalProduct + this.populateRightString(g1.name,group2,links) + '</tr>'
  })
  return `${finalProduct} </tbody>`
} 

private populateRightString(group1Name:string,group2:any,links:any) {
  
  let finalProduct = ""
  group2.forEach((g2:any) => {
  let rRow = '<td '
  links.forEach((link:any) => {
    if(((link.source === g2.name && link.target === group1Name && link.value!==0) || (link.source === group1Name && link.target === g2.name && link.value!==0)) && link.style) {
      rRow  = rRow +`style= ${Object.entries(link.style).map(([k, v]) => `${k}:${v}`).join(';')};width:10%;>${link.value}</td>`  
      finalProduct = finalProduct +rRow  
      if(!link.style) {
      rRow = rRow+">"  + link.value +"</td>";
      finalProduct = finalProduct +rRow
      }
    }
    else 
    if(((link.source === g2.name && link.target === group1Name && link.value===0) || (link.source === group1Name && link.target === g2.name  && link.value===0))) {
      finalProduct = finalProduct + "<td></td>"
    }
  })
})
return finalProduct
}

// private populateRight(group1Name:string,group2:any,links:any,row:any) { 
//   group2.forEach((g2:any) => {
//   let rRow = row.insertCell(-1);
//   links.forEach((link:any) => {
//     if((link.source === g2.name && link.target === group1Name) || (link.source === group1Name && link.target === g2.name)) {
//       rRow.innerHTML = link.value;
//       if(link.style) {
//         rRow.style.cssText =Object.entries(link.style).map(([k, v]) => `${k}:${v}`).join(';')  
//         rRow.style.cssText =  rRow.style.cssText+'width:10%;'
//       }
//     }
//   })
// })
// }

// private createHeadersAndProperties(group1:any[],group2:any[],links:any[],table:any) {
//     let propertiesLeftSet: any = new Set()
//     let propertiesRightSet:any = new Set();
//     let rightHeaders:string[] = []
//     let firstCollumns:string[] = []
//     group1.forEach((g1,g1Index) =>{
//       rightHeaders.push(g1.name);
//       g1.properties.forEach((g1P:any) => {
//         propertiesLeftSet.add(g1P.label)
//       })
//     })
//     group2.forEach((g2,g2Index) =>{
//       firstCollumns.push(g2.name);
//       g2.properties.forEach((g1P:any) => {
//         propertiesRightSet.add(g1P.label)
//       })
//     })
 
//     const propertiesLeftArray:string[] = Array.from(propertiesLeftSet);
//     const propertiesRightArray:string[] = Array.from(propertiesRightSet);

//     this.createRightHeader(propertiesLeftArray.length,group2,table);
 
//     this.createRightProperties(propertiesLeftArray.length,propertiesRightArray,table,group2);
  
//     this.createRightPropertiesString(propertiesLeftArray.length,propertiesRightArray,table,group2);
//     this.createLeftHeader(propertiesRightArray.length,propertiesLeftArray,table);
//     this.populateLeft(group1,group2,links,propertiesLeftArray,table);
 
  
// } 
private sortTable(n:any) {
  var table:any,
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
    for (i = rows.length-sortusRows.length; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
private createHeadersAndPropertiesString(group1:any[],group2:any[],links:any[],table:any) {
  let propertiesLeftSet: any = new Set()
  let propertiesRightSet:any = new Set();
  let rightHeaders:string[] = []
  let firstCollumns:string[] = []
  group1.forEach((g1,g1Index) =>{
    rightHeaders.push(g1.name);
    g1.properties.forEach((g1P:any) => {
      propertiesLeftSet.add(g1P.label)
    })
  })
  group2.forEach((g2,g2Index) =>{
    firstCollumns.push(g2.name);
    g2.properties.forEach((g1P:any) => {
      propertiesRightSet.add(g1P.label)
    })
  })
   
  const propertiesLeftArray:string[] = Array.from(propertiesLeftSet);
  const propertiesRightArray:string[] = Array.from(propertiesRightSet);

  const rightHeader:string =this.createRightHeaderString(propertiesLeftArray.length,group2,table);
  const rightProperties:string =this.createRightPropertiesString(propertiesLeftArray.length,propertiesRightArray,table,group2);
  const leftHeader = this.createLeftHeaderString(propertiesRightArray.length,propertiesLeftArray,table);
  const populate = this.populateLeftString(group1,group2,links,propertiesLeftArray,table);
  const tableString:string = rightHeader + rightProperties + leftHeader + populate
  return tableString
}

// private leftSortable() {
  // var sortable = document.querySelectorAll('.sortableLeft');
  // for (var i = 0; i < sortable.length; i++) {
  //   sortable[i].addEventListener('click', function(event) {
        
  //   });
// }
//}
  private sortRows() { 
    var sortable = document.querySelectorAll('.sortableLeft');
        for (var i = 0; i < sortable.length; i++) {
          sortable[i].addEventListener('click', (event) => {
            this.sortTable(i)
          })};
  }
  private createMatrix(data: any) {
 
    let selectedGroup1: any[] = Array.from(new Set(data.Matrix.nodes.map((d: any) => {if(d.group ===1) return d})));
    selectedGroup1 = selectedGroup1.filter((el:any) => { return el !==undefined})
    let selectedGroup2: any[] = Array.from(new Set(data.Matrix.nodes.map((d: any) => {if(d.group ===2) return d})));
    selectedGroup2 = selectedGroup2.filter((el:any) => { return el !==undefined})
    let links:any[] = Array.from(new Set(data.Matrix.links.map((d:any) => { return d})))
    var table = document.createElement("table");
    table.style.cssText= "border-spacing: 0;width: 100%;border: 1px solid #ddd;"
      var tableString = `<table id ="myTable" style= "border-spacing: 0;width: 100%;border: 1px solid #ddd";` + this.createHeadersAndPropertiesString(selectedGroup1,selectedGroup2,links,table);
      
        //this.createHeadersAndProperties(selectedGroup1,selectedGroup2,links,table);
        var divShowData = document.getElementById('showData');
        
        //@ts-ignore
        divShowData.innerHTML = tableString;
       
        this.sortRows()
        // //@ts-ignore
        // divShowData.appendChild(table);

  }

}

