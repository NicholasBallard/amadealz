var parseString = require('xml2js').parseString;
const { OperationHelper } = require("apac");

const opHelper = new OperationHelper({
  awsId: "AKIAJQLGCN7GNOU7CMQQ",
  awsSecret: "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",
  assocId: "chewhe-20" // it's the associate tag
});

opHelper
  .execute("ItemSearch", {
    SearchIndex: "Books",
    Keywords: "harry potter",
    ResponseGroup: "ItemAttributes,Offers"
  })
  .then(response => {
    // console.log("Results object: ", response.result);
    // console.log("Raw response body: ", response.responseBody);

    var text = response.responseBody;
    parseString(text, function (err, result) {
      console.dir(result);
    })
    
  })
  .catch(err => {
    console.error("Something went wrong! ", err);
  });
