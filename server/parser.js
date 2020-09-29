const rp = require('request-promise');
const cheerio = require('cheerio');
const utils = require('util');
const { next } = require('cheerio/lib/api/traversing');

 /* 
 let title = $('title').text();
                const headTags = [];
                $('head > script ').each((_, elm) => {
                headTags.push({  headSrcUrl: elm.attribs['src'] });
                });
                let bodyTags = [];
                $('body > script ').each((_, elm) => {
                    if(elm.attribs['src'] != 'undefined'  ){
                        bodyTags.push({  bodySrcUrl: elm.attribs['src'] });
                    }
                });

                //console.log(' title:: ', title,  ' script:: ', headTags , '  bodyTags::',bodyTags);
                

                parsedSites.push('title',title);
                parsedSites.push('url',url);
                parsedSites.push('headTags',headTags);
                parsedSites.push('bodyTags',bodyTags);
                console.log(' parsedSites:: ', parsedSites);
               return parsedSites;

*/
module.exports = {
    
    timeStamp: () => {
        console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000));
    },
    currentDate: () => {
       return new Date().toISOString().slice(0, 10);
    },
     parseSites: async (req, res, url) => {
        //Array.isArray(url)
        var parsedSites = [];
        try {
      const body =  await rp.get(url);
      
                let $ = cheerio.load(body);
                let title = $('title').text();
                const headTags = [];
                $('head > script ').each((_, elm) => {
                headTags.push({  headSrcUrl: elm.attribs['src'] });
                });
                let bodyTags = [];
                $('body > script ').each((_, elm) => {
                    if(elm.attribs['src'] != 'undefined'  ){
                        bodyTags.push({  bodySrcUrl: elm.attribs['src'] });
                    }
                });

                //console.log(' title:: ', title,  ' script:: ', headTags , '  bodyTags::',bodyTags);
                

                parsedSites.push('title',title);
                parsedSites.push('url',url);
                parsedSites.push('headTags',headTags);
                parsedSites.push('bodyTags',bodyTags);
                console.log(' parsedSites:: ', parsedSites);
               return parsedSites;
            
            /*if (Array.isArray(url) && i < urls.length) {
                parseSites(urls[i], parsedSites);// recursive call;
            }
            else {
                return parsedSites;
            }
            */
    } catch (e) {
        throw e;
      }
        return parsedSites;
    }
  }

