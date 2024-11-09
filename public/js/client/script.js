import { checkValidate } from './validate.js';
import SweetAlert from './SweetAlert.js';

// Register
const formRegister = document.querySelector('.form-register');

if (formRegister) {
    const btnRegister = formRegister.querySelector('.btn-register');
    btnRegister.addEventListener('click', function () {
        let isValid = checkValidate('register');
        if (isValid) {
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const userData = {
                fullName: fullName,
                email: email,
                password: password,
            };
            handleUser(userData, 'register');
        }
    });
}

const formLogin = document.querySelector('.form-login');
if (formLogin) {
    const btnLogin = formLogin.querySelector('.btn-login');
    btnLogin.addEventListener('click', function () {
        let isValid = checkValidate('login');
        if (isValid) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const userData = {
                email: email,
                password: password,
            };
            handleUser(userData, 'login');
        }
    });
}

const handleUser = async (data, type) => {
    try {
        const response = await fetch(
            `/user/${type == 'login' ? 'login' : 'register'}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );

        const status = response.status;
        const result = await response.json();

        if (status == 200) {
            SweetAlert.noticeSuccess(result.message, {
                willClose: () => {
                    window.location.href = '/';
                },
            });
        } else {
            SweetAlert.noticeTopRight(result.message || 'Có lỗi xảy ra');
        }
    } catch (error) {
        SweetAlert.noticeTopRight(result.message || 'Server Error!');
    }
};

// Preview image
const uploadImage = document.querySelector('[upload-image]');
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector('[upload-image-input]');
    const uploadImagePreview = uploadImage.querySelector(
        '[upload-image-preview]',
    );

    uploadImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
            new Viewer(uploadImagePreview, {
                inline: false,
            });
        }
    });
}

// Preview avatar
const formEditUser = document.querySelector('[form-edit-user]');
if (formEditUser) {
    const uploadImageInput = formEditUser.querySelector('[upload-image-input]');
    const uploadImagePreview = document.querySelector('[upload-image-preview]');

    uploadImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}

// Detail question
const questionsBody = document.querySelectorAll('[question_id]');
if (questionsBody) {
    questionsBody.forEach((card) => {
        const questionId = card.getAttribute('question_id');
        const btnReply = card.parentNode.querySelector('.btn-reply');
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                e.stopPropagation();
            } else {
                window.location.href = `/question/${questionId}`;
            }
        });
        btnReply.addEventListener('click', (e) => {
            window.location.href = `/question/${questionId}#form-reply`;
        });
    });
}

const btnReplyDetail = document.querySelector('.btn-reply-detail');
if (btnReplyDetail) {
    btnReplyDetail.addEventListener('click', () => {
        const formReply = document.querySelector('#form-reply');
        formReply.scrollIntoView({ block: 'center' });
    });
}

// Vote reply
const buttonVote = document.querySelectorAll('.button-vote');
if (buttonVote) {
    for (const button of buttonVote) {
        button.addEventListener('click', async (e) => {
            let idReply = button.getAttribute('id_reply');
            let type = 'dislike';
            if (button.hasAttribute('vote-like')) {
                type = 'like';
            }
            const url = window.location.href;
            const id = url.match(/\/question\/([a-zA-Z0-9]+)/)[1];

            const data = {
                idQuestion: id,
                idReply: idReply,
                type: type,
            };

            const response = await fetch(`/question/reply/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response) {
                location.reload();
            }
        });
    }
}

// Sort Reply
const selectSortReply = document.querySelector('#select-sort-reply');
if (selectSortReply) {
    const urlParams = new URLSearchParams(window.location.search);
    let currentSort = urlParams.get('sort') || 'vote';
    if (selectSortReply.classList.contains('sort-info')) {
        currentSort = urlParams.get('sort') || 'desc';
    }
    selectSortReply.value = currentSort;

    selectSortReply.addEventListener('change', (e) => {
        const value = selectSortReply.value;
        if (window.location.hash) {
            history.replaceState(null, '', window.location.href.split('#')[0]);
        }
        const currentUrl = new URL(window.location.href);

        currentUrl.searchParams.set('sort', value);
        if (!selectSortReply.classList.contains('sort-info')) {
            window.location.href = currentUrl.toString() + '#sort';
        } else {
            window.location.href = currentUrl.toString();
        }
    });

    window.addEventListener('load', () => {
        if (window.location.hash === '#sort') {
            selectSortReply.scrollIntoView({ block: 'center' });
        }
    });
}

// Viewer
document.addEventListener('DOMContentLoaded', function () {
    const imagesContainer = document.querySelectorAll('#images');
    if (imagesContainer) {
        imagesContainer.forEach((gallery) => {
            new Viewer(gallery, {
                inline: false,
            });
        });
    }
});

// Toggle hiển thị menu khi bấm vào icon
const iconsOption = document.querySelectorAll('.icon-option');
if (iconsOption) {
    iconsOption.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            // Ngăn không cho sự kiện click lan truyền ra ngoài
            e.stopPropagation();

            const menu = icon.nextElementSibling;
            menu.style.display =
                menu.style.display === 'none' || menu.style.display === ''
                    ? 'block'
                    : 'none';

            // Đóng menu khi click ra ngoài
            document.addEventListener(
                'click',
                function handleClickOutside(event) {
                    if (
                        !icon.contains(event.target) &&
                        !menu.contains(event.target)
                    ) {
                        menu.style.display = 'none';
                        document.removeEventListener(
                            'click',
                            handleClickOutside,
                        );
                    }
                },
            );
        });
    });
}

// Delete question
const btnDeleteQuestion = document.querySelectorAll('[btn-delete-question]');
if (btnDeleteQuestion) {
    btnDeleteQuestion.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const href = btn.getAttribute('href');

            Swal.fire({
                title: 'Bạn có chắc chắn muốn xóa?',
                text: 'Thao tác này không thể hoàn tác!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(href, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => {
                            const status = response.status;
                            if (status == 200) {
                                Swal.fire(
                                    'Đã xóa!',
                                    'Câu hỏi đã được xóa thành công.',
                                    'success',
                                ).then(() => {
                                    window.location.reload();
                                });
                            } else {
                                Swal.fire(
                                    'Thất bại!',
                                    'Không thể xóa câu hỏi. Vui lòng thử lại sau.',
                                    'error',
                                );
                            }
                        })
                        .catch(() => {
                            Swal.fire(
                                'Lỗi!',
                                'Đã xảy ra lỗi khi xóa câu hỏi.',
                                'error',
                            );
                        });
                }
            });
        });
    });
}
