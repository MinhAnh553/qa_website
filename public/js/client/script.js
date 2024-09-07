import { checkValidate } from './validate.js';
import SweetAlert from './SweetAlert.js';

const formRegister = document.querySelector('.form-register');

if (formRegister) {
    const btnRegister = formRegister.querySelector('.btn-register');
    btnRegister.addEventListener('click', function () {
        let isValid = checkValidate();
        if (isValid) {
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const userData = {
                fullName: fullName,
                email: email,
                password: password,
            };
            registerUser(userData);
        }
    });
}

const registerUser = async (data) => {
    try {
        const response = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const status = response.status;
        const result = await response.json();

        if (status == 200) {
            SweetAlert.noticeSuccess(result.message, {
                willClose: () => {
                    window.location.href = '/';
                },
            });
        } else if (status == 409) {
            SweetAlert.noticeTopRight(result.message);
        } else {
            SweetAlert.noticeTopRight(result.message || 'Có lỗi xảy ra');
        }
    } catch (error) {
        SweetAlert.noticeTopRight(result.message || 'Server Error!');
    }
};
