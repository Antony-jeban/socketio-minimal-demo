const socket = io('ws://localhost:8080');

const chat = document.querySelector('.chat');
const loginPage = document.querySelector('.login');
const userName = document.querySelector('.usernameInput');

console.log(chat);
console.log(loginPage);
chat.style.display = 'none';

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && userName.value !== '') {
        if (loginPage.style.display === 'none') {
            const text = document.querySelector('.inputMessage').value;
            socket.emit('new message', text)
        }
        if (userName.value && userName.value !== 'a') {
            socket.emit('add user', userName.value);
            userName.value = 'a';
        }
        loginPage.style.display = 'none';
        chat.style.display = '';
    }
});

socket.on('new message', text => {
    const el = document.createElement('li');
    el.innerHTML = `${text.username} Send: ${text.message}`;
    document.querySelector('ul').appendChild(el)
});

// document.querySelector('button').onclick = () => {
//     const text = document.querySelector('.inputMessage').value;
//     socket.emit('message', text)
//     document.querySelector('input').value = '';
// };