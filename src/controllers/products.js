import * as productsService from "../services/products.js";

export async function getAllProducts(request, reply) {
    const products = await productsService.getAllProducts(request.query.search);
    
    if(products.length === 0){
        return reply.status(404).send();
    }

    return products;
}

export async function getProduct(request, reply) {
    const product = await productsService.getProduct(request.params.id);
    
    if(product.length === 0){
        return reply.status(404).send();
    }

    return product;
}

export async function set(request, reply) {
    const status = await productsService.setProduct(request.body)

    return reply.status(status).send();
}

export async function update(request, reply) {
    const status = await productsService.updateProduct(request.params.id, request.body);

    return reply.status(status).send();
}

export async function remove(request, reply) {
    const status = await productsService.deleteProduct(request.params.id);
    
    return reply.status(status).send();
}