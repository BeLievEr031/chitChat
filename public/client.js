const socket = io();
let textarea = document.querySelector("textarea");
let msgArea = document.querySelector(".msg-area");
let usrName;

do {
  usrName = prompt("Enter your name");
} while (!usrName);
textarea.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    // console.log(e.target.value);
    sendMsg(e.target.value);
    handleScrolling();
  }
});

function sendMsg(message) {
  let msg = {
    userName: usrName,
    messageToBeSend: message.trim(),
  };

  generateMessage(msg, "outgoing");

//   sending message to the server
  socket.emit("message", msg);
}

function generateMessage(msg, type) {
  let msgDiv = document.createElement("div");
  let className = type;
  msgDiv.classList.add(className, "msg");

  let html = `  <h5 class="username">
                        ${msg.userName}
                    </h5>
                    <p>${msg.messageToBeSend} </p>`;
                    msgDiv.innerHTML = html;
    msgArea.append(msgDiv);
    textarea.value = "";
}


// message comes from  server

socket.on("message", (msg)=>{
    console.log(msg);
    generateMessage(msg, "incoming");
});

// scrolling

function handleScrolling(){
    msgArea.scrollTop = msgArea.scrollHeight;
}