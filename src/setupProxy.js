const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://10.113.5.103:8082/", // 后台服务地址以及端口号
      changeOrigin: true, // 是否开启代理
      pathRewrite: {
        "/api": "", // 代理名称
      },
    })
  )
}