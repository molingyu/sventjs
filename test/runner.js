var fs = require('fs');
var cp = require('child_process');
var colors = require('colors');
var root = './test/tests/';

var testIndex = 0;
var testErrorNum = 0;
fs.readdir(root, (error, paths)=>{
    paths.forEach((path)=>{
        cp.execFile('node', [root + path], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            testIndex++;
            fs.readFile(root + path, 'utf8', (err, str)=> {
                var out = str.split("// doc put\n")[1];
                var outs = out.split("\n");
                var isError = false;
                var stdouts = stdout.split("\n");
                var index = 0;
                outs.forEach((line)=>{
                    line = line.replace(/(^\s*)|(\s*$)/g, "");
                    var code = line.slice(0, 2);
                    if (code != '//' && code != '/*' && code != '*/'){
                        if(line != stdouts[index]) isError = true;
                        index ++;
                    }
                });
                console.log('================================================================'.blue);
                console.log(('Test:' + path).blue);
                console.log('================================================================'.blue);
                console.log(stdout);
                console.log('Out:'.magenta);
                if(isError) {
                    testErrorNum++;
                    console.log(out.red)
                } else {
                    console.log(out.yellow)
                }
                if(testIndex == paths.length) {
                    console.log('================================================================'.cyan);
                    console.log('Tests:' + testIndex + ' ' + 'Errors:' + testErrorNum);
                }
            });
        })
    });
});