// Sidebar active
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.list-group-item');
    const navItems = document.querySelectorAll('.nav-item');

    menuItems.forEach((item) => {
        const href = item.getAttribute('href');

        if (currentPath.includes(href)) {
            menuItems.forEach((item) => item.classList.remove('active'));
            item.classList.add('active');
        }
    });

    navItems.forEach((item) => {
        const href = item.querySelector('a').getAttribute('href');

        if (currentPath.includes(href)) {
            navItems.forEach((item) => item.classList.remove('active'));
            item.classList.add('active');
        }
    });
});

// Delete user
const btnDeleteUser = document.querySelectorAll('.btn-delete-user');
if (btnDeleteUser) {
    btnDeleteUser.forEach((btn) => {
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
                                    'Xóa thành công.',
                                    'success',
                                ).then(() => {
                                    window.location.reload();
                                });
                            } else {
                                Swal.fire(
                                    'Thất bại!',
                                    'Không thể xóa. Vui lòng thử lại sau.',
                                    'error',
                                );
                            }
                        })
                        .catch(() => {
                            Swal.fire(
                                'Lỗi!',
                                'Đã xảy ra lỗi khi xóa.',
                                'error',
                            );
                        });
                }
            });
        });
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
                                    'Xóa thành công.',
                                    'success',
                                ).then(() => {
                                    window.location.reload();
                                });
                            } else {
                                Swal.fire(
                                    'Thất bại!',
                                    'Không thể xóa. Vui lòng thử lại sau.',
                                    'error',
                                );
                            }
                        })
                        .catch(() => {
                            Swal.fire(
                                'Lỗi!',
                                'Đã xảy ra lỗi khi xóa.',
                                'error',
                            );
                        });
                }
            });
        });
    });
}

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

const uploadImagePreview = document.querySelector('.image-edit');
if (uploadImagePreview) {
    new Viewer(uploadImagePreview, {
        inline: false,
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
