const elList = findElement('#top-products');
const elTemplate = findElement('#template-products');
const elLanguage = findElement('#select-language');

let lang = localStorage.getItem('lang');


elLanguage.value = lang
if (lang === 'uz') {
        document.title = `Uzum Market - internet do'kon`;
} else if (lang === 'ru') {
        document.title = `Uzum Market - интернет магазин`;
}

elLanguage.addEventListener("change", () => {
        const langValue = elLanguage.value;

        localStorage.setItem('lang', langValue);

        lang = langValue

        if (lang === 'uz') {
                document.title = `Uzum Market - internet do'kon`;
        } else if (lang === 'ru') {
                document.title = `Uzum Market - интернет магазин`;
        }
});

renderProducts(products, elList);



