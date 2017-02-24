const request = require('request');
const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var translate = function(word){
    request.get(
        'https://translate.yandex.net/api/v1.5/tr.json/translate?' +
        'key=trnsl.1.1.20151114T134828Z.aa43da10d4dd885e.4bfa8ff05343c72d5e69416a3023805492f86af7&lang=en-ru&text=' + word,
        function (error, response, body) {
            if (error) {
                console.error(error);
            } else {
                console.log(JSON.parse(body).text[0]);
                question();
                //console.log(response.statusCode);
            }
        }
    );
};

var question = function() {
    rl.question('Введите слово или фразу на английском или \'q\' для выхода \n', function (answer) {
        if (answer.toLowerCase() == 'q') {
            rl.close();
        } else {
            translate(answer);
        }
    });
};

question();

