const puppeteer = require('puppeteer')
const fs = require('fs');

const instagram = async (headless) => {
    const browser = await puppeteer.launch({ headless: headless })
    const page = await browser.newPage()
    await page.goto('https://instagram.com/accounts/login/?next=/_iwolfu/')
    return {browser, page}
}

const connect = async (page) => {
    await page.waitForTimeout(2000)

    const username = await page.$("input[name='username']")
    const password = await page.$("input[name='password']")
    const button = await page.$("button[type='submit']")
    
    let rawdata = fs.readFileSync('data/perso.json')
    let data = JSON.parse(rawdata)
    
    await username.type(data.login)
    await password.type(data.password)
    
    await button.click()

    await page.waitForNavigation()
    
    const next = await page.$("#react-root > section > main > div > div > div > div > button")
    await next.click()
}

const followerPage = async (page) => {
    await page.waitForNavigation()
    
    const followers = await page.$("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a")
    const number = await (await (await followers.$('span')).getProperty('textContent')).jsonValue()
    followers.click()
    return number
}

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

(async () => {
    const {browser, page} = await instagram(false)
    
    await connect(page)
    const followers = await followerPage(page)
    
    await page.waitForTimeout(1000)
    await page.waitForSelector("body > div.RnEpo.Yx5HN > div > div > div > div.isgrP > ul > div > li:nth-child(1)")

    let list = []

    while(list.length < followers) {

    }

    
    // const list = await page.$$("body > div.RnEpo.Yx5HN > div > div > div > div.isgrP > ul > div > li")



    // let i=0
    // while(i<10) {
    //     await first.click()

    //     await page.keyboard.down('Space')
    //     i++
    // }

    // const boundingBox = await followerList.boundingBox();
    // await page.mouse.move(
    // boundingBox.x + boundingBox.width / 2,
    // boundingBox.y + boundingBox.height / 2
    // )

    // await page.mouse.wheel({ deltaY: 100 })

    // await browser.close()
})()