const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async function run() {
  const browser = await puppeteer.launch({
    // headless: false
  });


  async function pageInit() {
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
    return page;
  }


  // const site = {
  //   url: 'https://weekly.75team.com/',
  //   selector: '#bd issue-list a'
  // };
  // const site = {
  //   url: 'https://m.xinxs.la/86_86745/all.html',
  //   selector: '#chapterlist>p>a'
  // };
  const site = {
    url: 'https://www.zhetian.org/1361/',
    selector: '.fulldir a'
  };

  // 打开链接、获取内容，下一轮
  async function goPage(info, callback) {
    const page = await pageInit();
    await page.goto(info.url, {
      // 等待网络状态为空闲的时候才继续执行
      waitUntil: 'networkidle2',
      timeout: 0,
    });

    // '#chapterlist > p > a'
    return page.evaluate(callback, info);
  }

  const alldir = await goPage(site, info => {
    // 这里是沙箱，要传递变量才能读取外部变量
    var els = [...document.querySelectorAll(info.selector)];
    // return arr.map(el => el.innerText);
    return els.map(el => {
      return {
        url: el.href.trim(),
        title: el.innerText,
      };
    });
  });

  printResult({
    dist: './text/output/',
    name: 'alldir',
    content: alldir,
  });

  // await page.screenshot({
  //   path: `screenshots/text.png`,
  //   fullPage: true
  // });

  // '#chaptercontent'
  // 21 => https://www.zwda.com/shengxu/7574717/
  // https://www.zhetian.org/1361/53.html
  // https://www.zhetian.org/novelsearch/reader/transcode/siteid/34/url/aHR0cHM6Ly93d3cuendkYS5jb20vc2hlbmd4dS83NzA3MTUxLw==
  // https://www.zwda.com/shengxu/7707151/
  // https://www.zhetian.org/1361/54.html
  // https://www.zhetian.org/novelsearch/reader/transcode/siteid/34/url/aHR0cHM6Ly93d3cuendkYS5jb20vc2hlbmd4dS83NzA5MDUwLw==
  // https://www.zwda.com/shengxu/7709050/

  async function task(info, index) {
    info.selector = '#chaptercontent';
    const result = await goPage(info, info => {
      // 这里是沙箱，要传递变量才能读取外部变量
      const el = document.querySelector(info.selector);
      // return arr.map(el => el.innerText);
      return el.innerHTML.replace(/<br>/g, '/n');
    });

    printResult({
      dist: './text/output/',
      name: `${index}.${info.title}`,
      content: result,
    });
  }

  const tasks = alldir.slice(0, 100).map((item, index) => {
    return task(item, index + 1);
  });
  await Promise.all(tasks);

  browser.close();
})();

function printResult(info) {
  const file = `${info.dist}${info.name}.md`;
  fs.outputFile(file, JSON.stringify(info.content, null, 2), err => {
    if (err) {
      console.error('printResult err:', err) // => null
      return;
    }
    console.log(`${info.name} 获取成功！`);
  });
}
