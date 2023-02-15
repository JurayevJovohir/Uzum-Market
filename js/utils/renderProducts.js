function renderProducts(array, parent) {
    parent.textContent = null;
    array.slice(0, 20).forEach((product) => {
            const newProduct = elTemplate.content.cloneNode(true);

            const productImg = findElement('img', newProduct)
            const productTitle = findElement('#products-title', newProduct)
            const productRating = findElement('#products-rating', newProduct)
            const productPrice = findElement('#products-price', newProduct)
            const productPrice2 = findElement('#products-price-2 ', newProduct)

            productImg.src = product.image
            productTitle.textContent = product.name
            productRating.textContent = product.rating
            productPrice.textContent = product.price
            productPrice2.textContent = product.price2

            elList.appendChild(newProduct)
    });
}
