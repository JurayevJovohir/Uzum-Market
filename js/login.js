import findElement from './utils/findElement.js';

const elForm = findElement('.login-js');
const elLoginEmail = findElement('#form2Example1');
const elLoginPassword = findElement('#form2Example2');
const elLoginBtn = findElement('#form2Example3');
const elMessage = findElement('.error-message');

const BASE_URL = 'https://reqres.in/api/';

elForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    elMessage.textContent = '';
    elLoginEmail.className = 'form-control';
    elLoginPassword.className = 'form-control';

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!elLoginEmail.value.match(mailFormat)) {
        elLoginEmail.className += ' error-input';
        elLoginPassword.className += ' error-input';
        elMessage.textContent = 'Wrong format'
        return;
    }

    if (!(elLoginPassword.value.trim().length >= 6)) {
        elLoginPassword.className += ' error-input';

        elMessage.textContent = 'Password must contain at least 6 symbols';
        return;
    }

    fetch(BASE_URL + 'register', {
        method: 'post',
        body: JSON.stringify({
            email: elLoginEmail.value,
            password: elLoginPassword.value,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
        .then((res) => {
            if (res.error) {
                throw new Error(res.error);
            }

            const token = res.token;

            localStorage.setItem('token', token);

            window.location.href = '../index.html';
        })
        .catch((err) => {
            elMessage   .textContent = 'Incorrect email or password';
        });
});