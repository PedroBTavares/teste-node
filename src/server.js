import { fastify } from "fastify";
import { productsRoutes } from "./routes/products.js";

const server = fastify({
    routerOptions:{
        ignoreTrailingSlash: true
    }
});

server.register(productsRoutes);

server.listen({
    port: process.env.PORT ?? 9002
});