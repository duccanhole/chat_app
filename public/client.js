//call socket from server
var socket = io();
//declare variable
var form = document.getElementById('form');
var input = document.getElementById('text');
var textBox = document.getElementById('mess');
var formName = document.getElementById('form-name');
var userName = document.getElementById('username');
//get user name
formName.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(userName.value){
        formName.style.display = 'none';
        document.getElementById('box').style.display = 'block';
        userName=userName.value;
    }
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value){
        //send input to socket server
        switch(input.value){
            case '#help': botHelp(); break;
            case '#date': botChat(new Date());break;
            case '#coin': showBPI();break;
            case '#dog': showDog();break;
            case '#cat': showCat();break;
            default:
                socket.emit('message', input.value, userName);
        }
    }
    input.value='';
})
//respond data from socket server
socket.on('message',(msg, name)=>{
    let user = document.createElement('strong');
    let text = document.createElement('p');
    text.innerText = msg;
    user.innerText = name;
    textBox.appendChild(user);
    textBox.appendChild(text);
})
//check number user in room chat
socket.on('online',(online)=>{
    let activity = document.getElementById('activity');
    activity.innerText = 'Online: '+online;
})
function botChat(msg){
    let bot = document.createElement('strong');
    let text = document.createElement('p');
    text.innerHTML = msg;
    bot.innerText = 'Bot';
    textBox.appendChild(bot);
    textBox.appendChild(text);
}
//bot chat help
function botHelp(){
    let msg = 'BotChat command: <br><b>#date:</b> show date <br><b>#coin:</b> show BPI (Bitcoin Price Index) <br><b>#dog:</b> show dog image <br><b>#cat:</b> get some fact about cat <br><b>#help:</b> show botchat command<br>(<u>NOTE</u>: only you can see this message)';
    botChat(msg);
}
//show coin
function showBPI(){
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res=>res.json())
      .then(data=>{
          let dolla = data['bpi']['USD']['rate'];
          let euro = data['bpi']['EUR']['rate'];
          let msg = 'Bitcoin Price Index:<br> USD '+dolla+'(dollar)<br>'+'EURO '+euro+'(euro)';
          botChat(msg);
      })
}
//show dog image
function showDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res=>res.json())
    .then(data=>{
        let img = document.createElement('img');
        let bot = document.createElement('strong');
        let line = document.createElement('br');
        img.src=data['message'];
        img.style.width = '150px';
        img.style.height = '150px';
        bot.innerText='Bot';
        textBox.appendChild(bot);
        textBox.appendChild(line);
        textBox.appendChild(img);
        textBox.appendChild(line);
    })
}
//show cat fact
function showCat(){
    fetch('https://catfact.ninja/fact')
    .then(res=>res.json())
    .then(data=>{
        botChat(data['fact']);
    })
}