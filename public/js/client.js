const userName = prompt("Please enter your name:");

const socket = io.connect('http://localhost:8000');

if(userName) {
    socket.emit('set-username', userName);
}

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('chat message', message);
    messageInput.value = ''; // Clear the input after sending
});

socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = `${data.username}: ${data.text}`;

    // Check if the message was sent by the current client
    if(data.senderId === socket.id) {
        messageElement.classList.add('message', 'right');
    } else {
        messageElement.classList.add('message', 'left');
    }
    messageContainer.append(messageElement);
});
