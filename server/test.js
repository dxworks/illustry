const {
    quicktype,
    InputData,
    JSONSchemaInput,
    JSONSchemaStore,
} = require("quicktype-core");
const path = require("path");
const fs = require("fs");

async function quicktypeJSONSchema(targetLanguage, typeName, jsonSchemaString) {
    const schemaInput = new JSONSchemaInput(new JSONSchemaStore());

    // We could add multiple schemas for multiple types,
    // but here we're just making one type from JSON schema.
    await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    return await quicktype({
        inputData,
        lang: targetLanguage,
    });
}

async function main() {
    // read the schema details
    const schemaFilepath = path.join(__dirname, "./jsonSchemas/Matrix.json");
    const bookSchema = fs.readFileSync(schemaFilepath, "utf-8");

    const { lines: tsPerson } = await quicktypeJSONSchema(
        "typescript",
        "Matrix",
        bookSchema
    );
    console.log(tsPerson.join("\n"));

    // const { lines: pythonPerson } = await quicktypeJSONSchema(
    //     "python",
    //     "Book",
    //     bookSchema
    // );
    // console.log(pythonPerson.join("\n"));
}

main();