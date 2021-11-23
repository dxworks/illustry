import _ from "lodash";
import { FileProperties } from "../types/fileproperties";
const converter = require('json-2-csv')
const fs = require("fs");
export const readFile = (file: FileProperties, project: any, next: any) => {
    fs.readFile(_.get(file, 'filePath'), (error: any, data: any) => {
        if (error) {
            next(error,null)
        }
        if (file.type === 'application/json') {
            let illustration = data.toString();
            let finalJson = {
                IllustrationData: _.get(JSON.parse(illustration),'illustrationData')
            }
            next(null, { ...project, ...finalJson })
        }
        else
        if (file.type === 'text/csv'|| file.type ==='application/vnd.ms-excel') {
            let illustration = data.toString();

            converter.csv2json(illustration, function (err: any, json: any) {
                if (err) throw err;
                let finalJson = {
                    IllustrationData:json
                }
                next(null, { ...project, ...finalJson })
            })
        }
    })
}

function csvToJson(csv:any) {
    const content = csv.split('\n');
    const header = content[0].split(',');
    return _.tail(content).map((row:any) => {
      return _.zipObject(header, row.split(','));
    });
  }