var name = window.prompt('你的名字是?');
var text = '加入聊天室';
var t = new Date().toString();
var time = t.slice(3, 24);

//var time = t.toLocaleTimeString();
var r = Math.random()*255;
var g = Math.random()*255;
var b = Math.random()*255;

if (name.toLowerCase() == 'l'){
    r = 255;
    g = 255;
    b = 0;
    text = '私がLです(我就是L)';
}
if (name.toLowerCase() == 'killer'){
    r = 255;
    g = 0;
    b = 0;
    text = '私がキラだ(我就是奇樂)';
}if (name.toLowerCase() == 'shadow'){
    r = 34;
    g = 34;
    b = 34;
    text = ':)';
}
var color = `rgb(${r}, ${g}, ${b})`;
var list = [text,name,  time, color]
$('#input').keypress(keypress);

appendComment(text, name, time, color);
socket.emit("talk", list);
socket.on("talk", onMessage);

// 將訊息資料新增到畫面上
function appendComment (text, name, time, color) {
    var html = `<p style="color: ${color};">
            【${name} ${time}】${text}
        </p>`;
    $('#chatbox').append(html);
    var heigh = $("chatbox").prop("scrollHeigh");
    $("chatbox").scrollTop(heigh);
}

// 當輸入框按下 enter 按鍵時，廣播訊息給其他在線使用者
function keypress(e) {
    var text = $("#input").val();
    var tt = new Date().toString();
    var clock = tt.slice(3, 24);
    var olist = [text, name, clock, color];
    console.log(clock);
    if(e.keyCode == 13&&text !== ''){
        appendComment (text, name, clock, color);
        $("#input").val("");
        socket.emit("talk", olist);
        
    }
   
}

// 當接收到訊息資料時，將資料新增到介面上
function onMessage(data) {
    console.log(data)
    appendComment(data[0], data[1], data[2], data[3]);
    
}