const elList = findElement('#top-products');
const elTemplate = findElement('#template-products');

const elLoader = findElement(".lds-spinner");

let products = []

const BASE_URL = 'https://fakestoreapi.com'

fetch( BASE_URL + '/products')
        .then((res) => res.json())
        .then((res) => {
                products = res;
                renderProducts(products, elList);
                elLoader.style.cssText = 'display: none!important';
        });


