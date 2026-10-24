var id; //房間id
var p1_count = 0; //自己的點擊次數
var p2_count = 0; //對方的點擊次數
var status = 0; //遊戲狀態 0: 等待, 1: 遊戲中, 2: 遊戲結束

$('#setId').click(setId);
$('#ready').click(ready);
$('body').keyup(push);
$('#restart').click(restart);
$('#reid').hide();
$('#reid').click(ready);
//A玩家(開局者)
socket.on("ready", function(data){
    if (data == id) {
        start();
        socket.emit("start", id);
    }
});
//B玩家(輸入者)
socket.on("start", function(data){
    if (data == id) {
        start();
    }
});

socket.on("update", function(data) {
        p2_count = data;
});
//產生房間 ID
function setId () {
    id = Math.floor(Math.random()*10000);
    $("h1").text("房間ID:"+id);
    $("button").fadeOut();
}

//輸入對方 ID
function ready () {
    id = prompt("請輸入對方房間ID:");
    while (isNaN(id)) {
        id = prompt("請重新輸入對方房間ID(數字):");
    }
    $("h1").text("房間ID:"+id);
    $("button").fadeOut();
    $('#reid').fadeIn();
    socket.emit("ready", id);
}

//開始遊戲
function start () {
    $('#reid').fadeOut();
    $("#cover").fadeOut();
}

//推擠對方
function push () {
    p1_count ++;
    update();
    socket.emit("update", p1_count);
}

//更新遊戲畫面
function update () {
    var diff = p1_count - p2_count;
    console.log(diff);
    $("body").css("background-position-x" , `${diff+50}%`);

}

//遊戲結束
function gameover () {

}

//重新開始
function restart () {

}