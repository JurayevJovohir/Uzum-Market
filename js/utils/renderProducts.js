function renderProducts(array, parent) {
    parent.textContent = null;
    array.slice(0, 20).forEach((product) => {
            const newProduct = elTemplate.content.cloneNode(true);

            console.log(product)
            const productImg = findElement('img', newProduct)
            const productTitle = findElement('#products-title', newProduct)
            const productRating = findElement('#products-rating', newProduct)
            const productPrice = findElement('#products-price', newProduct)
            const productPrice2 = findElement('#products-price-2 ', newProduct)

            productImg.src = product.image
            productTitle.textContent = product.title.slice(1,25)
            productRating.textContent = product.rating.rate + `(${product.rating.count} baho)`
            productPrice.textContent = product.price
            productPrice2.textContent = product.price

            elList.appendChild(newProduct)
    });
}
