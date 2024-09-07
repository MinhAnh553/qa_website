const noticeTopRight = (message, option) => {
    Swal.fire({
        position: 'top-end',
        text: message,
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
    });
};

const noticeSuccess = (message, option) => {
    Swal.fire({
        title: 'Thành công',
        text: message,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        ...option,
    });
};

const noticeError = (message, option) => {
    Swal.fire({
        title: 'Thành công',
        text: message,
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        ...option,
    });
};

export default {
    noticeTopRight,
    noticeSuccess,
};
