import _ from "lodash";
import { Promise } from "bluebird";
import { FileError } from "../errors/fileError";
import { FileProperties } from "types/fileproperties";
// const converter = require('json-2-csv')
var fs = require('fs')

const read = (file: FileProperties) => {
    return new Promise((resolve, reject) => {
        fs.readFile(_.get(file, 'filePath'), (error: any, data: any) => {
            if (error) {
                reject(new FileError("Problems while uploading the files"))
            }
            if (file.type === 'application/json') {
                let illustration = JSON.parse(data.toString());
                let finalJson: any = {
                    data: illustration?.data,
                    name: illustration?.name,
                    description:illustration?.description,
                    type: illustration?.type,
                    tags: illustration?.tags
                }

                resolve(finalJson)
            }
        })
    })
}
export const readFile = (files: FileProperties[]) => {
    return Promise.all(files.map(read))
        .then((files) => {
            return files

        })



}
 