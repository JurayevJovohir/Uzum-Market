import findElement from "./utils/findElement.js";
import renderProducts from "./utils/renderProducts.js";

const elList = findElement('#top-products');
const elTemplate = findElement('#template-products');
const elLoader = findElement(".lds-spinner");
const elForm = findElement('.form-product');

const token = localStorage.getItem('token');

if (!token) {
        window.location.href = '../index.html';
}

elForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const elImg = evt.target.img.value;
        const elTitle = evt.target.title.value
        const elRating = evt.target.rating.value
        const elPrice = evt.target.price.value
        const elPrice2 = evt.target.price2.value
        const elCategory = evt.target.category.value

        const newProduct = {
                createdAd: new Date(),
                image: elImg,
                title: elTitle,
                rating: elRating,
                price: elPrice,
                price2: elPrice2,
                category: elCategory,
        };


        fetch(BASE_URL + '/products', {
                method: 'post',
                body: JSON.stringify(newProduct),
                headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                },
        }).then((res) => res.json())
                .then((data) => {
                        console.log(data);
                })
});

let products = []

const BASE_URL = 'https://63ecdce432a0811723a39772.mockapi.io/';

(async function getData() {
        const res = await fetch(BASE_URL + '/products');
        const data = await res.json();
        products = data;

        renderProducts(products, elList, elTemplate, true);
        elLoader.style.cssText = 'display: none!important';
})();

elList.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target.className.includes('delete-btn')) {
                const id = Number(target.dataset.id);

                fetch(`https://63ecdce432a0811723a39772.mockapi.io/products/${id}`, {
                        method: 'delete',
                        headers: {
                                Authorization: 'Bearer ' + token,
                                'Content-Type': 'application/json',
                        },
                })
                        .then((res) => res.json())
                        .then((res) => {
                                elLoader.style.cssText = 'display: block!important';
                                window.location.reload();
                        });
        }
});

