function renderProducts(array, parent, template) {
    parent.textContent = null;
    array.forEach((product) => {
        const newProduct = template.content.cloneNode(true);

        const svg = findElement('#like', newProduct)
        const path = findElement('#path', newProduct)
        const productImg = findElement('img', newProduct)
        const productTitle = findElement('#products-title', newProduct)
        const productRating = findElement('#products-rating', newProduct)
        const productPrice = findElement('#products-price', newProduct)
        const productPrice2 = findElement('#products-price-2 ', newProduct)


        if (product.isFavorite) {
            path.style.fill = 'red';
        } else {
            path.style.fill = 'none';
        }

        svg.dataset.id = product.id;
        path.dataset.id = product.id;

       

        productImg.src = product.image
        productTitle.textContent = product.name
        productRating.textContent = product.rating
        productPrice.textContent = product.price
        productPrice2.textContent = product.price2

        parent.appendChild(newProduct)
    });
}

