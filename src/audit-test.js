// or ESM/TypeScript import
//import Ajv from "ajv"
// Node.js require:
const Ajv = require("ajv")

const ajv = new Ajv({ allowUnionTypes: true }) // options can be passed, e.g. {allErrors: true}

const outputJsonSchema = {
  "type": "object",
  "properties": {
    "Sample": {
      "type": "object",
      "properties": {
        "Title": { "type": "string" },
        "Level": { "type": "string" },
        "Client": { "type": "string" },
        "Service": { "type": "string" },
        "Endpoint": { "type": "string" },
        "Provider": { "type": "string" },
        "RepositoryUrl": { "type": "string" }
      }
    },
    "AADApps": {
      "type": "array"
    },
    "CodeConfiguration": {},
  },
  "required": [
    "Sample",
    "AADApps",
    "CodeConfiguration"
  ]
}

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" }
  },
  required: ["foo"],
  additionalProperties: false,
}

const elementSchema = {
  type: "object",
  properties: {
    outputKey: { type: "string" },
    elementLabel: { type: "string" },
    elementDescription: { type: "string" },
    elementType: {
      type: "string",
      enum: ["text", "check-box", "select"]
    },
    elementValues: {
      type: "array",
      items: {
        type: ["string", "number"]
      }
    },
  },
  required: [
    "outputKey",
    "elementLabel",
    "elementType",
  ],
  additionalProperties: false,
};

const recurseTest = {
  type: "object",
  definitions: {
    elementSchema
  },
  properties: {
    "keyOne": {
      "$ref": "#/definitions/elementSchema",
    },
    "keyTwo": {
      "$ref": "#/definitions/elementSchema",
    }
  },
  required: [
    "keyOne",
    "keyTwo",
  ],
}

const descriptionObjectSchema = {
  type: "object",
  properties: {
    title: {
      "$ref": "#/definitions/elementSchema"
    }
  }
}

const uiSchema = {
  type: "object",
  definitions: {
    elementSchema,
  },
  properties: {
    appDescription: {
      type: "array",
      items: {
        "$ref": "#/definitions/elementSchema"
      }
    }
  },
  additionalProperties: false,
};

const data = {
  //foo: 1,
  bar: "abc",
}

const validate = ajv.compile(schema);
const valid = validate(data);
//if (!valid) console.log(validate.errors);

const testElement = ajv.compile(elementSchema);
const result = testElement({
  "outputKey": "test",
  "elementLabel": "label",
  "elementType": "text",
});
//if (!result) console.log(testElement.errors);

const testRecurseSchema = ajv.compile(recurseTest);
const nextResult = testRecurseSchema({
  "keyOne": {
    "outputKey": "test",
    "elementLabel": "label",
    "elementType": "text",
  },
  "keyTwo": {
    "outputKey": "test",
    "elementLabel": "label",
    "elementType": "text",
  },
});
if (!nextResult) console.log(testRecurseSchema.errors);


const testUiSchema = ajv.compile(uiSchema);
const uiResult = testUiSchema({
  "appDescription": [
    {
      "outputKey": "test",
      "elementLabel": "label",
      "elementType": "text",
    },
    {
      "outputKey": "test",
      "elementLabel": "label",
      "elementType": "text",
    }
  ]
});
if (!uiResult) console.log(testUiSchema.errors);


const sampleUi = require('./sample-ui.json');
const jsonValidator = ajv.compile(uiSchema)
const uiJsonResult = jsonValidator(sampleUi);
if (!uiJsonResult) console.log(jsonValidator.errors);