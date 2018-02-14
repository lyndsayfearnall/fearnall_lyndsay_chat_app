(() => {
   const socket = io(); //running on the front-end

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message');
      nickName = null;
      feedback = document.querySelector('.feedback');
      go = document.querySelector('#go');
      board = document.querySelector('#messageBoard');
      box = document.querySelector('#chatbox');
      signin = document.querySelector('#nickname');

  function enterChat(){
        if (nickName = (nickName && nickName.length > 0)) {
        board.style.display = "block";
        box.style.display = "block";
        signin.style.display = "none";
        }
    }

  function setNickname(){
    nickName = this.value;
    //console.log(nickName);
  }

  function handleSendMessage(e){
    //console.log(nickName); //nickName now evaluates as "true" instead of as a string... I know this is probably really simple, but I can't figure out why
    e.preventDefault(); //prevents default (page reload)

    //nickName = (nickName && nickName.length > 0) ? nickName : 'user'; // ? is ternary operator, checking if variable exists and if it has something inside it... then it evaluates to true OR if false, nickName = 'user'
    msg = `${nickName} says ${chatMessage.value}`;
    socket.emit('chat message', msg);
    chatMessage.value='';
    return false;
  }

  function appendMessage(msg){ //prints new chat message onto page
    //debugger;
    let newMsg = `<li class="chatLi">${msg.msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDMessage(msg){ //prints user disconnect message onto page
    //debugger;
    // let newMsg = `<li>${nickName} ${msg}</li>`;
    // messageList.innerHTML += newMsg;
      console.log(nickName);
  }

  function typing(){
    //console.log('typing');
    socket.emit('typing', )
  }

//Trying to get ul to scroll to newest message...
  // function scroll(chatLi) {
  //   target = document.querySelector('.chatLi');
  //
  //   messageList.scrollTop = (target.offsetTop -50);
  //   console.log(target.offsetTop);
  // }


  nameInput.addEventListener('change', setNickname, false);
  go.addEventListener('click', enterChat, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
  chatMessage.addEventListener('keypress', typing, false);
  //chatForm.addEventListener('submit', scroll, false);
})();
