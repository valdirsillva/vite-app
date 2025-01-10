
export class ManagerStorage {
    constructor() {}

    add(key, obj) {
        if (localStorage.getItem('produtos') === null) {
            let data = Object.assign(obj, { id: 1})
            localStorage.setItem(`${key}`, JSON.stringify([data]))
            return true
        } 

        const items = JSON.parse(localStorage.getItem(`${key}`))

        const lastIndex = items.length - 1;
        const lastId = items[lastIndex]?.id || 0;
        /**
         * Adiciona o novo produto com um ID incrementado
         */
        const newProduct = {
            id: lastId + 1,
            nomeProduto: obj.nomeProduto,
            descricaoProduto: obj.descricaoProduto,
            preco: obj.preco,
        }
        /**
         *  Atualiza a lista de produtos
         */
        items.push(newProduct);
        localStorage.setItem(`${key}`, JSON.stringify(items));
        return true
    }

    getAll(key) {
        return localStorage.getItem(`${key}`)
    }

    update(key, obj, productId) {
        // Retorna a lista de produtos
        const response = this.getAll(key);

        let products = response ? JSON.parse(response) : {}
        /**
         * O filter retorna todos os produtos que for diferente do id que será atualizado
         */
        const listProducts = products.filter((product) => product.id !== productId);

        /**
         * Atualizo a lista com o novo objeto atualizado
         */
        listProducts.push(obj);     
        localStorage.setItem(key, JSON.stringify(listProducts));

        return true
    }

    delete(key, productId) {
        const response = this.getAll(key);

        let products = response ? JSON.parse(response) : {}
        const listProducts = products.filter((product) => product.id !== productId);
    
        localStorage.setItem(key, JSON.stringify(listProducts));

        return true
    }
}