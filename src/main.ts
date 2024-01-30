import express, { Request, Response, NextFunction } from "express";
import subdomain from "express-subdomain";
import { createProxyMiddleware } from "http-proxy-middleware";
import { subroutes, routes } from "./server/config";

const app = express();

// app.use((req: Request, res: Response, next: NextFunction) => {
//     next();
// });

subroutes.forEach(t => {
    const { route, target } = t;
    app.use(
        subdomain(
            route,
            createProxyMiddleware({
                target,
                changeOrigin: true,
            })
        )
    );
});

routes.forEach(t => {
    const { route, target } = t;
    app.use(
        `/${route}`,
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
});

app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
        return res.sendStatus(204);
    }
    res.status(404).send('Not Found!');
});


const port = 80;
const server = app.listen(port);

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
