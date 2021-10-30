import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "@qntm-code/utils";


@Injectable({
  providedIn: 'root'
})
export class PluginOutputConverterService {

  constructor() {
  }

  public convertToGraph(pluginGraphOutput: any): string {

    let result = '';
    const graphJson = pluginGraphOutput;
    console.log("aici")
    console.log(graphJson)
    if (isNullOrUndefined(pluginGraphOutput) || isNullOrUndefined(graphJson) || pluginGraphOutput === '') {
      //@ts-ignore
      return null;
    }
    // const visualTags = graphJson.visualTags;
    // if (isNullOrUndefined(visualTags))
    //   return null;
    // if (visualTags.includes('digraph')) {
    result = 'strict digraph G{\n';
    // } else if (visualTags.includes('graph')) {
    //   result = 'strict graph G{\n';
    // }

    result += '\tcompound=true;\n';
    result += this.extractNodesInfo(graphJson);
    result += this.extractLinksInfo(graphJson);
    result += '}';
    return result;
  }

  private extractNodesInfo(testDataJSON:any): string {
    let nodesText = '';
    const nodes = testDataJSON.nodes;
    if (!isNullOrUndefined(nodes)) {
      nodes.forEach((node:any) => {
        const formatting = node.formatting;
        if (!isNullOrUndefined(formatting)) {
          nodesText += '\t\"' + node.id + '\"' + this.extractFormatting(formatting) + ';\n';
        }
      });
    }
    console.log(nodesText)
    return nodesText;
  }

  private extractLinksInfo(testDataJSON: any) {
    let linksText = '';
    const links = testDataJSON.links;
    if (!isNullOrUndefined(links)) {
      links.forEach((link:any) => {
        const formatting = link.formatting;
        const source = link.source;
        const target = link.target;
        if (isNullOrUndefined(source) || isNullOrUndefined(target)) {
          return;
        }

        linksText += '\t\"' + source + '\" -> \"' + target + '\"' + this.extractFormatting(formatting) + ';\n';
      });
    }
    console.log(linksText)
    return linksText;
  }

  private extractFormatting(formattingJson: any): string {
    if (isNullOrUndefined(formattingJson)) {
      return '';
    }
    let hasFormatting = false;
    let label = formattingJson.label;
    let color = formattingJson.color;
    let shape = formattingJson.form;
    let style = formattingJson.style;

    if (!isNullOrUndefined(label)) {
      hasFormatting = true;
      label = 'label=' + label;
    } else {
      label = '';
    }
    if (!isNullOrUndefined(color)) {
      hasFormatting = true;
      color = 'color=' + color;
    } else {
      color = '';
    }
    if (!isNullOrUndefined(shape)) {
      hasFormatting = true;
      shape = 'shape=' + shape;
    } else {
      shape = '';
    }
    if (!isNullOrUndefined(style)) {
      hasFormatting = true;
      style = 'style=' + style;
    } else {
      style = '';
    }

    if (hasFormatting) {
      return '[ ' + shape + ' ' + color + ' ' + style + ' ' + label + ' ]';
    } else {
      return '';
    }
  }

}
