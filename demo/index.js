const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(devices['iPhone 6']);

  // 默认 safari
  await page.goto('https://m.haoshiqi.net');

  await autoScroll(page);
  // console.log(await page.content());
  // await page.screenshot({path: 'screenshots/hsq.png'});
  await page.screenshot({ path: 'screenshots/full.png', fullPage: true });

  await browser.close();
}

run();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
