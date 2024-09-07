export function checkValidate(type) {
    const fullNameEle = document.getElementById('fullName');
    const emailEle = document.getElementById('email');
    const passwordEle = document.getElementById('password');
    const rePasswordEle = document.getElementById('rePassword');

    let isCheck = true;

    if (type == 'login') {
        let emailValue = emailEle.value.trim();
        let passwordValue = passwordEle.value;

        if (emailValue === '') {
            setError('email', 'Email không được để trống');
            isCheck = false;
        } else if (!isEmail(emailValue)) {
            setError('email', 'Email không đúng định dạng');
            isCheck = false;
        } else {
            setSuccess('email');
        }

        if (passwordValue === '') {
            setError('password', 'Mật khẩu không được để trống');
            isCheck = false;
        } else {
            setSuccess('password');
        }
    }

    if (type == 'register') {
        let fullNameValue = fullNameEle.value.trim();
        let emailValue = emailEle.value.trim();
        let passwordValue = passwordEle.value;
        let rePasswordValue = rePasswordEle.value;

        if (fullNameValue === '') {
            setError('fullName', 'Họ tên không được để trống');
            isCheck = false;
        } else {
            setSuccess('fullName');
        }

        if (emailValue === '') {
            setError('email', 'Email không được để trống');
            isCheck = false;
        } else if (!isEmail(emailValue)) {
            setError('email', 'Email không đúng định dạng');
            isCheck = false;
        } else {
            setSuccess('email');
        }

        if (passwordValue === '') {
            setError('password', 'Mật khẩu không được để trống');
            isCheck = false;
        } else {
            let passwordError = isPassword(passwordValue);
            if (passwordError) {
                setError('password', passwordError);
                isCheck = false;
            } else {
                setSuccess('password');
            }
        }

        if (passwordValue !== rePasswordValue) {
            setError('rePassword', 'Mật khẩu nhập lại không khớp.');
            isCheck = false;
        } else {
            setSuccess('rePassword');
        }
    }

    return isCheck;
}

function setError(name, message) {
    const errorElement = document.querySelector(`[validate="${name}"]`);
    errorElement.classList.add('error');
    errorElement.innerText = message;
}

function setSuccess(name) {
    const successElement = document.querySelector(`[validate="${name}"]`);
    successElement.classList.remove('error');
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
    );
}

function isPassword(password) {
    var p = password;
    var errors = [];
    if (p.length < 8) {
        errors.push('Mật khẩu của bạn phải có ít nhất 8 ký tự');
    }
    if (p.search(/[a-z]/i) < 0) {
        errors.push('Mật khẩu của bạn phải chứa ít nhất một chữ cái.');
    }
    if (p.search(/[0-9]/) < 0) {
        errors.push('Mật khẩu của bạn phải chứa ít nhất một chữ số.');
    }
    if (p.search(/[^a-zA-Z0-9]/) < 0) {
        errors.push('Mật khẩu của bạn phải chứa ít nhất một ký tự đặc biệt.');
    }

    return errors.length > 0 ? errors.join('\n') : null;
}
