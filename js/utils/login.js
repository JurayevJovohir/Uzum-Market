import findElement from "./findElement.js";

const elLogin = findElement('#login-btn')

elLogin.addEventListener('click', () => {
    console.log(elLogin.textContent);

    if (elLogin.textContent === "Войти") {
            elLogin.textContent =  "Выйти"
    }else { 
            elLogin.textContent = "Войти";
    }
})
