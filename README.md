# learn-puppeteer

学习Puppeteer

- http://csbun.github.io/blog/2017/09/puppeteer/
- https://github.com/chenxiaochun/blog/issues/38
- https://github.com/zhentaoo/puppeteer-deep
- https://www.infoq.cn/article/nodejs-weakness-cpu-intensive-tasks
- https://github.com/neilk/letterpwn
- tasks
  - https://github.com/d3/d3-queue
  - https://github.com/sindresorhus/p-waterfall
  - https://github.com/jhurliman/node-rate-limiter
  - https://github.com/rvagg/node-worker-farm
  - https://github.com/bevry/taskgroup

```js
const authURL = url.format({
  protocol: 'http',
  hostname: 'localhost',
  port: gatewayPort,
  pathname: '/oauth2/authorize',
  query: {
    response_type: 'code',
    client_id: clientID,
    state: state,
    redirect_uri: `http://localhost:${redirectPort}/cb`
  }
});
```
