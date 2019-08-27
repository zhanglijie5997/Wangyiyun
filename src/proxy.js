const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/api", {
            changeOrigin: true,
            target: "http://192.168.1.104:3001/",

        })
    );
}