'use strict';
var fs = require('fs');
var path = require('path');
const rp = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
var urlencodedParser = express.urlencoded({ extended: false });
const port = process.env.PORT || 3500;
const async = require('async');
const parser = require('./parser.js')



//SOLUTION 1: do what you need to do when all calls are done using recursion
let i = 0;
let parsedSiteMetadata = [];

const app = express();
app.use(express.json());       
app.use(express.urlencoded()); 

app.post('/scrap/:appid', async (req, res) => {
  console.log(JSON.stringify(req.body));
  var url = req.body.url  

   var parsedSites = [];
        try {
      const body =  await rp.get(url);
      
                let $ = cheerio.load(body);
                let title = $('title').text();
                const headTags = [];
                $('head > script ').each((_, elm) => {
                  const tagVal = elm.attribs['src'];
                  console.log(" tagVal::  ")
                  if(typeof tagVal !== 'undefined'  &&  tagVal.toLowerCase().indexOf('bootstrap') !== -1){
                    headTags.push({  headSrcUrl: tagVal });
                  }
                });
                let bodyTags = [];
                $('body > script ').each((_, elm) => {
                    if(typeof elm.attribs['src'] !== 'undefined'  && elm.attribs['src'].toLowerCase().indexOf('bootstrap') !== -1 ){
                        bodyTags.push({  bodySrcUrl: elm.attribs['src'] });
                    }
                });

               parsedSites.push({title: title, url: url, headTags: headTags, bodyTags: bodyTags, scannedDate: parser.currentDate()});
              
               
    } catch (e) {
        throw e;
      }
  console.log('parsedSite :: ',JSON.stringify(parsedSites));
  res.status('200').json( parsedSites );

  
});
app.use((req, res, next) => {
	console.log(`URL: ${req.url}`);
	next();
});


app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});

