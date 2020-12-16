const socket = io('ws://localhost:8080');

const userName = prompt('Enter your name');
const input = document.querySelector('.userMessage');
const inputText = document.querySelector('input')

if (userName) {
    console.log(userName);
    socket.emit('username', userName);
}

socket.on('displayMessage', data => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="user">${data.userName}</span>: ${data.message}`;
    document.querySelector('ul').appendChild(li)
});

socket.on('userConnected', data => {
    const li = document.createElement('li');
    li.innerHTML = `Welcome ${data}, who just joined the chat`;
    document.querySelector('ul').appendChild(li)
});

document.querySelector('button').onclick = () => {
    if (inputText.value) {
        socket.emit('message', inputText.value);
    }
    document.querySelector('input').value = '';
}

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && inputText.value) {
        event.preventDefault();
        socket.emit('message', inputText.value);
        document.querySelector('input').value = '';
    }
});