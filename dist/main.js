"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_subdomain_1 = __importDefault(require("express-subdomain"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const config_1 = require("./server/config");
const app = (0, express_1.default)();
// Logging Middleware
app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`);
    next(); // Pass control to the next middleware function
});
config_1.config.forEach(subroutes => {
    console.log("");
    app.use((0, express_subdomain_1.default)(subroutes.route, (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: subroutes.redirectUrl,
        changeOrigin: true,
    })));
});
app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});
const port = 80;
app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
