const jsf = require('json-schema-faker');
const schema = require('./pessoa.schema');
const fs = require('fs');

jsf.resolve(schema).then(sample => {
  console.log('Writing to db.json')
  fs.writeFile(`${__dirname}/db.json`, JSON.stringify(sample), function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("done");
    }
  });
});
