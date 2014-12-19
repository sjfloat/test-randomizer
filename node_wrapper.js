// For regression testing
var fs = require("fs")

var document = {};
document.write = function(stuff) {
    console.log(stuff);
}

eval(fs.readFileSync(__dirname + '/test.js').toString())

WriteTest();
