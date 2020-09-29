'use strict';
var fs = require('fs');
var path=require('path');
const cheerio = require('cheerio');
const express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = process.env.PORT || 3500;
const app = express();
var wordOfDay = [];

app.get('/', function (req, res) {
  // allow access from other domains
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  
  // use Cheerio to make request
  request({
    method: 'GET',
    url: 'https://www.dictionary.com/e/word-of-the-day/'
    }, function(err, response, body, callback) {
      if (err) return console.error(err);
      
      // get the HTML body from WordThink.com
      $ = cheerio.load(body);

      if(wordOfDay.length > 0){
        wordOfDay = [];
      }

      var post = $('#content .singlemeta:first-child .post');
      var word = post.find('.title').eq(0).text().replace('\r\n\t\t\t\t\t', '').replace('\r\n\t\t\t\t', '');
      var definition = post.find('p').eq(0).text().replace('\n', '');
      
      // create an object
      wordOfDay.push({word: word, definition: definition})

  });
  
  // return a JSON object as a response
  res.send(JSON.stringify(wordOfDay, null, 4));
});

// start app on localhost port 3000
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port ' + port);
});