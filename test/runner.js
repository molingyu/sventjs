var fs = require('fs');
var cp = require('child_process');
var colors = require('colors');

fs.readdir('./test/tests', (error, paths)=>{
    paths.forEach((path)=>{
        cp.execFile('node', ['./test/tests/' + path], (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log('================================================================'.blue);
            console.log(('Test:' + path).blue);
            console.log('================================================================'.blue);
            console.log(stdout);
        })
    })
});