const argv = require('minimist')(process.argv.slice(2));
const colour = require('colour');
require('console.table');
const fs = require('fs');

//console.dir(argv);

if(typeof argv['p'] == 'undefined'){
    console.log('Запуск: node analyze.js -p log.txt'.red);
} else {
    var path = argv['p'];
}

//console.log(argv['p']);

var read = function(){
    fs.readFile(path, function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        createData(obj);
    });
};

var createData = function(data) {
    console.table([data]);
};

// MAIN 
process.on('uncaughtException', function (err) {
    console.error(err);
});

read();