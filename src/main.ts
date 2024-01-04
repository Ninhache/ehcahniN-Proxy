import express, { Request, Response, NextFunction } from "express";
import subdomain from "express-subdomain";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./server/config";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

config.forEach(subroutes => {
    app.use(
        subdomain(
            subroutes.route,
            createProxyMiddleware({
                target: subroutes.redirectUrl,
                changeOrigin: true,
            })
        )
    );
})

app.use("*", (req: Request, res: Response) => {
    res.status(404).send("Page not found");
});

const port = 80;
app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
