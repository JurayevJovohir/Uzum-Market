import findElement from "./findElement.js";

function renderProducts(array, parent, template, isAdmin = false) {
    parent.textContent = null;
    array.forEach((product) => {
        const newProduct = template.content.cloneNode(true);
        const svg = findElement('#like', newProduct)
        const path = findElement('#path', newProduct)
        const productImg = findElement('#products-img', newProduct)
        const productTitle = findElement('#products-title', newProduct)
        const productRating = findElement('#products-rating', newProduct)
        const productPrice = findElement('#products-price', newProduct)
        const productPrice2 = findElement('#products-price-2 ', newProduct)

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

        console.log(productImg.src)
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

export default renderProducts;