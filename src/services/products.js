import fs from "fs/promises";
import sql from "./db.js";

export async function getAllProducts (search) {
    try{
        let products;
        if(search){
            products = await sql`select * from products where name ilike ${"%" + search + "%"}`;
        } else {
            products = await sql`select * from products`;
        }

        return products;
    } catch (err) {
        throw new Error(`Erro ao pegar os produtos. ${err}`);
    }
}

export async function getProduct(id) {
    try{
        const product = await sql`select * from products where id=${id}`;

        return product;
    } catch (err) {
        throw new Error(`Erro ao pegar o produto ${id}. ${err}`);
    }
}

export async function setProduct (product) {
    try{
        const {name, salePrice, purchasePrice, stockQuantity} = product;
        
        await sql`
            insert into products (name, sale_price, purchase_price, stock_quantity)
            values (${name}, ${salePrice}, ${purchasePrice}, ${stockQuantity})
        `;

        return 201;
    } catch (err) {
        throw new Error(`Erro ao salvar produto. ${err}`);
    }
}

export async function updateProduct (id, product) {
    try{
        const {name, salePrice, purchasePrice, stockQuantity} = product;
        
        const row = await sql`select exists( select 1 from products where id=${id} )`;

        if(!row[0].exists){
            return 404;
        }

        await sql`
            update products set
            name=${name},
            sale_price=${salePrice},
            purchase_price=${purchasePrice},
            stock_quantity=${stockQuantity}
            where id=${id}
        `;

        return 204;
    } catch (err) {
        throw new Error(`Erro ao atualizar produto. ${err}`);
    }
}

export async function deleteProduct (id) {
    try{
        const row = await sql`select exists( select 1 from products where id=${id} )`;
    
        console.log(id + "\n" + row[0].exists);
        if(!row[0].exists){
            return 404;
        }
        
        await sql`delete from products where id=${id}`;

        return 204;
    } catch (err) {
        throw new Error(`Erro ao salvar produto. ${err}`);
    }
}