import findElement from "./utils/findElement.js";
import renderProducts from "./utils/renderProducts.js";
import BASE_URL from "./utils/base_url.js";

const elList = findElement('#top-products');
const elTemplate = findElement('#template-products');
const elCategories = findElement('#categories');
const elLoader = findElement(".lds-spinner");

let products = [];
let categories = [];

fetch(BASE_URL + 'catigories')
        .then((res) => res.json())
        .then((data) => {
                categories = data;
                renderCategories(categories, elCategories)
        });

const renderCategories = (array, parent) => {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        newA.className = 'header_nav_link';
        newLi.className = 'header_nav_item';
        newA.textContent = 'All'
        newLi.appendChild(newA);
        parent.appendChild(newLi);

        array.forEach((category) => {
                const newLi = document.createElement('li');
                const newA = document.createElement('a');
                newLi.className = 'header_nav_item';
                newA.className = 'header_nav_link';
                newA.textContent = category.name;
                newLi.appendChild(newA);
                parent.appendChild(newLi);
        });
}

elCategories.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target.className.includes('header_nav_link')) {
                const category = target.textContent;

                const result = [];
                if (category.toLowerCase() !== 'all'.toLowerCase()) {
                        products.forEach((product) => {
                                if (product.category === category) {
                                        result.push(product)
                                }
                        });
                        renderProducts(result, elList, elTemplate);
                } else {
                        renderProducts(products, elList, elTemplate);
                }
        }
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
