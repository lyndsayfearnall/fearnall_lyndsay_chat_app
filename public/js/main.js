(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message');
      nickName = null;

  function setNickname(){
    //debugger;
    nickName = this.value;
  }

  function handleSendMessage(e){
    e.preventDefault(); //prevents default (page reload)
    nickName = (nickName && nickName.length > 0) ? nickName : 'user'; // ? is ternary operator, checking if variable exists and if it has something inside it... then it evaluates to true OR if false, nickName = 'user'
    msg = `${nickName} says ${chatMessage.value}`;

    socket.emit('chat message', msg);
    chatMessage.value='';
    return false;
  }

  function appendMessage(msg){ //prints new chat message onto page
    //debugger;
    let newMsg = `<li>${msg.msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDMessage(msg){ //prints user disconnect message onto page
    //debugger;
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
})();
