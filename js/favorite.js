import findElement from "./utils/findElement.js";
import renderProducts from "./utils/renderProducts.js";

const elFavorite = findElement('#top-favorite');
const template = findElement('#template-products');
const elLoader = findElement(".lds-spinner");
const elFavoriteText = findElement("#favorite-text");


let favoriteProducts = [];

fetch('https://63ecdce432a0811723a39772.mockapi.io/products/')
    .then((response) => response.json())
    .then(data => {

        const results = data.filter((product) => {
            if (    product.isFavorite) {
                return product;
            }
            elLoader.style.cssText = 'display: none!important';
        });

        favoriteProducts = results;

        if ((favoriteProducts.length == 0)) {
            elFavoriteText.className = 'fs-1 text-center'
        }
        renderProducts(results, elFavorite, template);
    });


elFavorite.addEventListener('click', (e) => {
    const target = e.target;

    if (target.id.includes('like') || target.id.includes('path')) {
        const id = Number(target.dataset.id);

        elLoader.style.cssText = 'display: block!important';
        elFavorite.style.display = 'none';

        favoriteProducts.forEach((product) => {
            if (+product.id === id) {
                product.isFavorite = !product.isFavorite;

                fetch(
                    `https://63ecdce432a0811723a39772.mockapi.io/products/${id}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify({
                            ...product,
                            isFavorite: product.isFavorite,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                    .then((res) => res.json())
                    .then((res) => {
                        fetch('https://63ecdce432a0811723a39772.mockapi.io/products/')
                            .then((response) => response.json())
                            .then(data => {

                                const results = data.filter((product) => {
                                    if (product.isFavorite) {
                                        return product;
                                    }
                                });

                                favoriteProducts = results;

                                renderProducts(results, elFavorite, template);

                                elLoader.style.cssText = 'display: none!important';
                                elFavorite.style.display = 'flex';

                                if ((favoriteProducts.length == 0)) {
                                    elFavoriteText.className = 'fs-1 text-center'
                                }
                            });
                    });
            }
        });
    }
});
