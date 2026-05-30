import { fastify } from "fastify";
import cors from "@fastify/cors";
import { productsRoutes } from "./routes/products.js";

const server = fastify({
    routerOptions:{
        ignoreTrailingSlash: true
    }
});

server.register(cors, {
    origin: "*"
});

server.register(productsRoutes);

server.listen({
    port: process.env.PORT ?? 9002,
    host: "0.0.0.0"
});
