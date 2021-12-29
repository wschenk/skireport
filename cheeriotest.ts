import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";

const url = 'https://www.mohawkmtn.com/snow-report/'

try {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html)  

  const trails = $('#snow-report-trails-wrapper .trail')
  console.log( trails.text() );
//  for( const trail in trails ) {
  //    console.log( trail )
  //o}
   //     const cells = $(".cell", $, trail)
     //   console.log( cells.text() )
 // }
} catch(error) {
  console.log(error);
}