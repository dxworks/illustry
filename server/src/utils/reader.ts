import _ from "lodash";
import { Promise } from "bluebird";
import { FileError } from "../errors/fileError";
import { FileProperties } from "types/fileproperties";
const csv = require('csv-parser')
var fs = require("fs");

const read = (file: FileProperties, separator?: string) => {
  if (file.type === "application/json") {
    return new Promise((resolve, reject) => {
      const buffer = fs.createReadStream(_.get(file, "filePath"), {
        encoding: "utf8",
      });
      let finalText: string = "";
      buffer.on("error", (err: any) => {
        reject(new FileError("Problems while uploading the files"));
      });
      buffer.on("data", (data: any) => {
        finalText = finalText + data;
      });
      buffer.on("end", () => {
        fs.unlinkSync(_.get(file, "filePath"));
        let illustration = JSON.parse(finalText);
        let finalJson: any = {
          data: illustration?.data,
          name: illustration?.name,
          description: illustration?.description,
          type: illustration?.type,
          tags: illustration?.tags,
        };
        resolve(finalJson);
      });
    });
  }
  if (file.type === 'text/csv' || file.type === "text/plain") {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(_.get(file, "filePath"), { encoding: "utf8" })
        .pipe(csv({ separator: separator }))
        .on('data', (data: any) => results.push(data))
        .on('end', () => {
          resolve(results)
        })
        .on("error", (err: any) => {
          reject(new FileError("Problems while uploading the files"));
        });;
    })
  }
};
export const readFile = (files: FileProperties[], separator?: string) => {
  return Promise.map(files, file => {
    return Promise.resolve(read(file, separator))
  })
    .then((files) => {
      return files;
    });

};
