const puppeteer = require('puppeteer');
const fs = require('fs-extra');

async function run() {
  const browser = await puppeteer.launch({
    // headless: false
  });

  const page = await browser.newPage();

  // 设置浏览器信息
  const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36";
  await Promise.all([
    page.setUserAgent(UA),
    // 允许运行js
    page.setJavaScriptEnabled(true),
    // 设置页面视口的大小
    // page.setViewport({width: 1100, height: 1080}),
    page.setRequestInterception(true),
  ]);
  // await page.emulate(devices['iPhone 6']);

  // block images
  // await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image') {
      request.abort();
    } else {
      request.continue();
    }
  });

  // const site = {
  //   url: 'https://weekly.75team.com/',
  //   selector: '#bd issue-list a'
  // };
  const site = {
    url: 'https://m.xinxs.la/86_86745/all.html',
    selector: '#chapterlist>p>a'
  };
  // const site = {
  //   url: 'https://www.zhetian.org/1361/',
  //   selector: '#chapterlist>p>a'
  // };
  await page.goto(site.url, {
    // 等待网络状态为空闲的时候才继续执行
    waitUntil: 'networkidle2',
    timeout: 0,
  });

  // '#chapterlist > p > a'
  const list = await page.evaluate(() => {
    var els = [...document.querySelectorAll('#chapterlist>p>a')];
    // return arr.map(el => el.innerText);
    return els.map(el => {
      return {
        url: el.href.trim(),
        title: el.innerText,
      };
    });
  });

  console.log(list);

  const file = './text/output/index.md';
  fs.outputFile(file, JSON.stringify(list, null, 2), err => {
    console.log(err) // => null
  });
  // await page.screenshot({
  //   path: `screenshots/text.png`,
  //   fullPage: true
  // });

  list.forEach(item => {
    // 打开一个页面，然后获取内容，然后继续下一个页面
    // TODO
  });

  browser.close();
}

try {
  run();
} catch (err) {
  console.log(err);
}
