# learn-puppeteer

学习Puppeteer

- http://csbun.github.io/blog/2017/09/puppeteer/
- https://github.com/chenxiaochun/blog/issues/38
- https://github.com/zhentaoo/puppeteer-deep

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
