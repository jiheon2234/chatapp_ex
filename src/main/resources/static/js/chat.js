const username = prompt("username");
const roomNum = 1000;  // 그냥고정함
const msgInput = document.getElementById("chat-outgoing-msg");
const chatBox = document.getElementById("chat-box");
const eventSource = new EventSource(`/chat/roomNum/${roomNum}`);


eventSource.onmessage = (e) => {
  const data = JSON.parse(e.data);
    initMsg(data)
};


function initMsg(data){
    const box = document.createElement('div')
    box.className = data.sender === username ? 'outgoing_msg' : 'received_msg'

    box.innerHTML = make_msg_box(data)
    chatBox.append(box)
    document.documentElement.scrollTop = document.body.scrollHeight;
}

function make_msg_box(data){
    return `
        <div class= "${data.sender === username ? 'sent_msg' : 'received_withd_msg'}">
        <p>${data.msg}</p>
        <span class="time_date">${data.createdAt}/${data.sender}}</span>
        </div>`
    }



async function addMsg(){
      const chat = {
        sender: username,
        roomNum: roomNum,
        msg: msgInput.value,
      };

       let res = await fetch("http://localhost:8080/chat", {
          method: "post",
          body: JSON.stringify(chat),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });
      console.log(res)
      msgInput.value = ""
}


document.getElementById("chat-outgoing-msg").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || !msgInput.value.trim()) return;
  addMsg();
});

