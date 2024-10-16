const bodyChat = document.querySelector('.chat .card-body');
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}

const showTyping = () => {
    const listTyping = document.querySelectorAll('.inner-list-typing');
    const div = document.createElement('div');

    div.classList.add('box-typing');
    div.innerHTML = `
        <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    listTyping[listTyping.length - 1].appendChild(div);
};

// CLIENT_SEND_MESSAGE
const formMessage = document.querySelector('.chat .inner-form');
if (formMessage) {
    formMessage.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = e.target.elements.content.value;
        if (message != '') {
            socket.emit('CLIENT_SEND_MESSAGE', {
                content: message,
            });
            e.target.elements.content.value = '';
        }
    });
}

// SERVER_RETURN_MESSAGE
socket.on('SERVER_RETURN_MESSAGE', (data) => {
    // Chèn tin nhắn vào view
    const myId = bodyChat.getAttribute('my-id');
    const div = document.createElement('div');
    div.classList.add('d-flex', 'flex-row');
    const listTyping = document.createElement('div');
    listTyping.classList.add('inner-list-typing');

    let htmlContent = '';
    if (data.content) {
        htmlContent = `<p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${data.content}</p>`;
    }

    if (myId == data.userId) {
        div.classList.add('justify-content-end', 'pt-1');
    } else {
        div.classList.add('chat-by-ai');
    }

    div.innerHTML = `
        <div>
            ${htmlContent}
        </div>
    `;

    bodyChat.appendChild(div);
    bodyChat.appendChild(listTyping);

    // Hiện typing
    showTyping();

    // Xong thì cuộn
    bodyChat.style.scrollBehavior = 'smooth';
    bodyChat.scrollTop = bodyChat.scrollHeight;
});

// SERVER_SEND_MESSAGE_AI
socket.on('SERVER_SEND_MESSAGE_AI', (message) => {
    // Chèn tin nhắn vào view
    const div = document.createElement('div');
    div.classList.add('d-flex', 'flex-row', 'chat-by-ai');

    let htmlContent = '';
    if (message) {
        htmlContent = `<p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${message}</p>`;
    }

    div.innerHTML = `
        <div>
            ${htmlContent}
        </div>
    `;

    // Ẩn typing
    const listTyping = document.querySelectorAll('.inner-list-typing');
    listTyping[listTyping.length - 1].innerHTML = '';

    bodyChat.appendChild(div);

    // Gửi tin nhắn xong thì cuộn
    bodyChat.style.scrollBehavior = 'smooth';
    bodyChat.scrollTop = bodyChat.scrollHeight;
});
