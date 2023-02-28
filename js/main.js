import findElement from "./utils/findElement.js";
import renderProducts from "./utils/renderProducts.js";
import BASE_URL from "./utils/base_url.js";

const elList = findElement('#top-products');
const elTemplate = findElement('#template-products');

const elLoader = findElement(".lds-spinner");

let products = [];
let categories = [];

fetch(BASE_URL + 'catigories')
        .then((res) => res.json())
        .then((data) => {
               data.forEach((category) => {
                console.log(category.name);
               })
        });


(async function getData() {
        const res = await fetch(BASE_URL + '/products');
        const data = await res.json();
        products = data;


        renderProducts(products, elList, elTemplate);
        elLoader.style.cssText = 'display: none!important';
})()


elList.addEventListener('click', (e) => {
        const target = e.target;


        if (target.id.includes('like') || target.id.includes('path')) {
                const id = Number(target.dataset.id);

                products.forEach((product) => {
                        if (+product.id === id) {
                                product.isFavorite = !product.isFavorite;

                                fetch(BASE_URL + `products/${id}`, {
                                        method: 'put',
                                        body: JSON.stringify({
                                                ...product,
                                                isFavorite: product.isFavorite,
                                        }),
                                        headers: {
                                                'Content-Type': 'application/json',
                                        },
                                })
                                        .then((res) => res.json())
                                        .then((res) => {

                                        });

                        }
                });

                renderProducts(products, elList, elTemplate);
        }
});






