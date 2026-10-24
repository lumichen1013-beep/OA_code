var id; //房間id
var p1_count = 0; //自己的點擊次數
var p2_count = 0; //對方的點擊次數
var status = 0; //遊戲狀態 0: 等待, 1: 遊戲中, 2: 遊戲結束
var lock = false;

$('#setId').click(setId);
$('#ready').click(ready);
$('body').keyup(push);
$('#restart').click(restart);
$('#reid').hide();
$('#reid').click(ready);

socket.on('ready', function (data) {
    if (id == data) {
        start();
        socket.emit('start', id);
    }
});

socket.on('start', function (data) {
    if (id == data) {
        start();
        console.log('start');
    }
});
socket.on('update', function (data) {
    if (id == data.id) {
        p2_count = data.count;
        update();
        //console.log('update');
    }
});

socket.on('gameover', function (data) {
    if (id == data) {
        gameover();
        console.log('gameover');
    }
});

//產生房間 ID
function setId () {
    id = Math.floor(Math.random()*10000);
    $('h1').text('房間 ID: ' + id);
    $('button').fadeOut();
}

//輸入對方 ID
function ready () {
    id = prompt("請輸入對方房間ID:");
    while (isNaN(id)) {
        id = prompt("請重新輸入對方房間ID(數字):");
    }
    $('h1').text('房間 ID: ' + id);
    $("button").fadeOut();
    $('#reid').fadeIn();
    socket.emit('ready', id);
}

//開始遊戲
function start () {
    $('#cover').fadeOut();
    $('#reid').fadeOut();
    lock = true;
    p1_count = 0;
    p2_count = 0;
    $("body").css('background-image', 'url(bg.jpg)');
    $('body').css('background-position-x', `${50 + Number(p1_count) - Number(p2_count)}%`);
}

//推擠對方
function push () {
    if (lock) {
        p1_count++;
        update();
        socket.emit('update', {id:id,  count:p1_count});
    }
    
}

//更新遊戲畫面
function update () {
    var diff = Number(p1_count) - Number(p2_count);
    //console.log(Number(diff));
    //console.log(p1_count);
    //console.log(p2_count);
    $('body').css('background-position-x', `${50 + diff}%`);
    if (diff >= 20) {
        socket.emit('gameover', id);
        gameover();
        
    }
}

//遊戲結束
function gameover () {
    lock = false;
    $('#cover').fadeIn();
    //$('#restart').show();
    $("#restart").fadeIn();
    $('h1').fadeIn();
    if (p1_count>p2_count) {
        $("body").css('background-image', 'url(bg_win.jpg)');
        $('h1').text('You win!');
    } else {
        $("body").css('background-image', 'url(bg_lose.jpg)');
        $('h1').text('You lose!');
    }
    
    
}

//重新開始
function restart () {
    $("button").fadeOut();
    socket.emit('ready', id);
    start();
}