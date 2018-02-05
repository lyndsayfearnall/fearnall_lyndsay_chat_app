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
    //debugger;
    nickName = (nickName && nickName.length > 0) ? nickName : 'user'; //checking if variable exists, and if it has something inside it... then it evaluates to true

    msg = `${nickName} says ${chatMessage.value}`;

    socket.emit('chat message', msg);
    chatMessage.value='';
    return false;
  }

  function appendMessage(msg){
    //debugger;
    let newMsg = `<li>${msg.msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDMessage(msg){
    //debugger;
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
})();
