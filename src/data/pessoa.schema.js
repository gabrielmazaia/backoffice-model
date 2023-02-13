const jsf = require('json-schema-faker');
const { faker } = require('@faker-js/faker');

jsf.extend('faker', () => faker);

module.exports = {
  type: "object",
  required: ["pessoas"],
  properties: {
    pessoas: {
      type: "array",
      minItems: 20,
      items: { "$ref": "#/definitions/pessoas" }
    }
  },
  definitions: {
    pessoas: {
      type: "object",
      required: ["id", "first_name"],
      properties: {
        id: {
          $ref: '#/definitions/positiveInt'
        },
        first_name: {
          type: "string",
          faker: "name.firstName"
        },
        apelido: {
          type: "string",
          faker: "name.nickName"
        },
        documentId:{
          $ref: '#/definitions/positiveInt',
          min: 1,
          uniqueitem: true
        },
        documentIdCnpj:{
          $ref: '#/definitions/positiveInt',
          min: 1,
          uniqueitem: true
        },
        email: {
          type: "string",
          faker: "internet.email"
        },

      }
    },
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true
    }
  }
}
