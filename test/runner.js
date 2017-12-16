var fs = require('fs');
var cp = require('child_process');
var colors = require('colors');
var root = './test/tests/';

var testIndex = 0;
var testErrorNum = 0;
var errors = [];
fs.readdir(root, (error, paths)=>{
    var size = paths.length;
    paths.forEach((path)=>{
      fs.readFile(root + path, 'utf8', (err, str)=> {
        testIndex++;
        var outs = str.split("// doc put\n")[1].split("\n").filter(value => !value.match(/\/\*/) && !value.match(/\*\//));
        console.log('================================================================'.blue);
        console.log(('Test:' + path + '(' + testIndex + '/' + size + ')').blue);
        console.log('================================================================'.blue);
        console.log('Out:'.magenta);
        outs.forEach(value => console.log(value.slice(0, 2) === '//' ? value.gray : value.yellow));
        console.log('----------------------------------------------------------------'.blue);
        outs = outs.filter(value => !value.match(/\/\//));
        var index = 0;
        var isError = false;
        print = string => {
          string = ' ' + string;
          if(outs[index]!== string){
            isError = true;
            string = string.red;
          }
          console.log(string);
          index++
        };
        require('./tests/' + path);
        if(index !== outs.length) {
          console.log('Error'.red);
          isError = true;
        }
        if(isError) {
          testErrorNum++;
          errors.push(path)
        }
        if(testIndex === size) {
          console.log('================================================================'.cyan);
          if(testErrorNum > 0) {
            console.log(('Tests:' + size + ' ' + 'Errors:' + testErrorNum).redBG);
            errors.forEach(value => console.log('  ' + value.red));
            console.log('================================================================'.cyan);
            process.exit(1);
          }
          console.log('Tests:' + size + ' ' + 'Errors:' + testErrorNum);
          console.log('================================================================'.cyan);
        }
      });
    });

});