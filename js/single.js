import BASE_URL from "./utils/base_url.js";
import findElement from "./utils/findElement.js";

const elTemplate = findElement('#template-products');
const elCard = findElement('.cards');

const id = localStorage.getItem('id');


fetch(BASE_URL + "products/" + id)
    .then((res) => res.json())
    .then((data) => {
        console.log((data));

        renderProducts([data], elCard, elTemplate);
    });

function renderProducts(array, parent, template, isAdmin = false) {
    parent.textContent = null;
    array.forEach((product) => {
        const newProduct = template.content.cloneNode(true);
        const svg = findElement('#like-single', newProduct)
        const path = findElement('#path-single', newProduct)
        const productImg = findElement('#products-img-single', newProduct)
        const productTitle = findElement('#products-title-single', newProduct)
        const productRating = findElement('#products-rating-single', newProduct)
        const productPrice = findElement('#products-price-single', newProduct)
        const productPrice2 = findElement('#products-price-single-2 ', newProduct)

        if (product.isFavorite) {
            path.style.fill = 'red';
        } else {
            path.style.fill = 'none';
        }

        // admin.js
        if (isAdmin) {
            const deleteBtn = findElement('.delete-btn', newProduct);
            deleteBtn.dataset.id = product.id;
        }
        svg.dataset.id = product.id;
        path.dataset.id = product.id;


        productImg.src = product.image
        productTitle.textContent = product.name
        productRating.textContent = product.rating
        productPrice.textContent = product.price
        productPrice2.textContent = product.price2

        productImg.addEventListener("click", () => {
            localStorage.setItem('id', product.id);
            window.location.href = '../../single.html'
        })

        parent.appendChild(newProduct)
    });
} 

//     if (target.id.includes('like') || target.id.includes('path')) {
//             const id = Number(target.dataset.id);

//             products.forEach((product) => {
//                     if (+product.id === id) {
//                             product.isFavorite = !product.isFavorite;

//                             fetch(BASE_URL + `products/${id}`, {
//                                     method: 'put',
//                                     body: JSON.stringify({
//                                             ...product,
//                                             isFavorite: product.isFavorite,
//                                     }),
//                                     headers: {
//                                             Authorization: 'Bearer ' + token,
//                                             'Content-Type': 'application/json',
//                                     },
//                             })
//                                     .then((res) => res.json())
//                                     .then((res) => {

//                                     });
//                     }
//             });
//             renderProducts(products, elList, elTemplate);
//     }
// });
