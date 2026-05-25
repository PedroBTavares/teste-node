import * as productsController from "../controllers/products.js";

export async function productsRoutes(fastify){

    fastify.get("/", () => {
        return "Server is runnig";
    });

    fastify.get("/products", async (request, reply) => productsController.getAllProducts(request, reply) );

    fastify.get("/products/:id", (request, reply) => productsController.getProduct(request, reply));

    fastify.post("/products", (request, reply) => productsController.set(request, reply));

    fastify.put("/products/:id", (request, reply) => productsController.update(request, reply));

    fastify.delete("/products/:id", (request, reply) => productsController.remove(request, reply));

}