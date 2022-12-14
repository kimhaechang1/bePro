const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(['/api/**','/post/**','/update/**','/user/**','/board/**','/get/**',"/auth/**","/comment/**"],{ 
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};