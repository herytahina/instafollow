// const puppeteer = require('puppeteer');
// const Film = require('./models/Film');

// const instagram = async (headless) => {
//     const browser = await puppeteer.launch({ headless: headless })
//     const page = await browser.newPage();
//     await page.goto('https://instagram.com');
//     return {browser, page}
// }

// const newMovies = async () => {
//     const {browser, page} = await instagram(false);
    
//     const views = await page.$$('.pages.clearfix');
//     const films = await views[0].$$('.short');
//     const loop = new Promise((res, rej) => {
//         films.forEach(async (film, index) => {
//             const titre = await (await (await film.$('.short-title')).getProperty('textContent')).jsonValue();
//             const langue = await (await (await film.$('.film-verz')).getProperty('textContent')).jsonValue();
//             const qualite = await (await (await film.$('.film-ripz')).getProperty('textContent')).jsonValue();
//             const image = await (await (await film.$('img')).getProperty('src')).jsonValue();
//             let tmp = new Film(titre.trim(), langue, qualite, image);
//             filmsArray.push(tmp);
//             if(index === films.length -1) res();
//         });
//     });
//     return loop.then( async ()=>{
//         await browser.close();
//         return filmsArray;
//     });
// }


// (async () => {
//     const f = await newMovies();
//     console.log(f);
// })();