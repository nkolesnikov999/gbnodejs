const request = require('request');
const cheerio = require('cheerio');

request('http://www.rbc.ru', function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);

		$('.main-feed__item').each(function(i, element){
			var title = $(this).find('.main-feed__item__title');		
			var link = $(this).find('a').attr('href');
            
			console.log(title.text());
            console.log(link + "\n");
		});

	} else {
		console.error(error);
	}
});
