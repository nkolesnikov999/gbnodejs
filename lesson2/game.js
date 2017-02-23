const readline = require('readline');
const colour = require('colour');
const fs = require('fs');

var countGame = 0; //количество сыгранных игр
var wins = 0; //количество побед
var loses = 0; //количество проигрышей
var winPod = 0; //количество побед подряд
var losePod = 0; //количество проигрышей подряд
var countWin = 0; //количество побед в одной сессии
var countLose =  0; //количество проигрышей в одной сессии

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//read from log/log.txt
var read = function(){
    if(fs.existsSync('log.txt')){
        //console.log("File log.txt is exist");
        fs.readFile('log.txt', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            countGame = obj.count;
            wins = obj.win;
            loses = obj.lose;
            winPod = obj.winPod;
            losePod = obj.losePod;
            //console.log("Game Count: %d", countGame);
        });
    } else {
        //console.log("File log.txt is not exist");
        entryAdd();
    }
};

//create entry for log
var entryAdd = function(){
    var entry = {'count' : countGame, 'win' : wins, 'lose' : loses, 'winLose' : (wins / loses).toFixed(2), 'winPod' : winPod, 'losePod' : losePod };
    var str = JSON.stringify(entry);
    write(str);
};

//write to log.txt
var write = function(data){
    fs.writeFile('log.txt', data, function (err) {
        if (err) throw err;
        //console.log('File has been saved!');
    });
};

var startGame = function () {
    rl.question('Орёл - 1, Решка - 2, Выход - 3 \n', function(answer){
        if(isCorrect(answer)){
            if(answer == 3){
                entryAdd();
                rl.close();
            } else {
                countGame++;
                //console.log("Выбрано: %d", answer);
                processGame(answer);
                startGame();
            }
        } else{
            console.log('Неправильно! Попробуй еще раз'.underline.red);
            startGame();
        }
    });
};

function isCorrect(n){
    return n >= 1 && n <= 3;
}

var processGame = function(num){
    var key = Math.floor(Math.random()*2) + 1;
    //console.log(key);
    
    if(key == num){
        wins++;
        countWin++;
        countLose = 0;
        if (countWin > winPod){
            winPod = countWin;
        }
        return console.log('Выиграл! Молодец!'.rainbow);
    } else {
        loses++;
        countLose++;
        countWin = 0;
        if (countLose > losePod){
            losePod = countLose;
        }
        return console.log('Упс.. Проиграл'.blue);
    }
};


// MAIN 
process.on('uncaughtException', function (err) {
    console.error(err);
});

read();
startGame();

