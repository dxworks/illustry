import _ from "lodash";
import { Promise } from "bluebird";
import { FileError } from "../errors/fileError";
import { FileProperties } from "types/fileproperties";
var fs = require("fs");

const read = (file: FileProperties) => {
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
};
export const readFile = (files: FileProperties[]) => {
  return Promise.all(files.map(read)).then((files) => {
    return files;
  });
};
