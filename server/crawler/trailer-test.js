// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
//   await page.goto('https://baidu.com');
//   await page.type('#kw', 'puppeteer', {delay: 100});
//   page.click('#su')
//   await page.waitFor(1000);
//   const targetLink = await page.evaluate(() => {
//     return [...document.querySelectorAll('.result a')].filter(item => {
//       return item.innerText && item.innerText.includes('Puppeteer的入门和实践')
//     }).toString()
//   });
//   console.log(targetLink)
//   await page.goto(targetLink);
//   await page.waitFor(1000);
//   browser.close();
// })()

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://0.0.0.0:3000/auth/?rf=http%3A%2F%2F0.0.0.0%3A8080%2Fresource%2Fdashboard');
  await page.type('.login .el-form .el-input input', 'wangpeng', {delay: 100});
  await page.type('.login .el-form .captcha-input input', '5314', {delay: 100});
  
  page.click('.el-button--primary')
  await page.waitFor(1000);
  // const targetLink = await page.evaluate(() => {
  //   return [...document.querySelectorAll('.result a')].filter(item => {
  //     return item.innerText && item.innerText.includes('Puppeteer的入门和实践')
  //   }).toString()
  // });
  // console.log(targetLink)
  // await page.goto(targetLink);
  await page.waitFor(1000);
  browser.close();
})()

