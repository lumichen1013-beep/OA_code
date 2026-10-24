var color = 'b';
var startTime;
var endTime;
var best = 1000;


$('body').click(check);

function check () {
    t = 1;
    if (color == 'b') {
        start();
    } else if (color == 'r') {
        toosoon();
    } else {
        showResuit();
    }
}

function start () {
    $('h1').text('等待綠色');
    $('h2').text('');
    $('body').css('background-color', 'red');
    color = 'r';
    var time = Math.random()*10000;
    setTimeout(timeOut, time);
}

function toosoon () {
    $('h1').text('太快了');
    $('h2').text('點擊頁面再來一次');
    $('body').css('background-color', 'blue');
    color = 'b';
}

function timeOut () {
    startTime = Date.now();
    $('h1').text('點擊!');
    $('h2').text('');
    $('body').css('background-color', 'green');
    color = 'g';
}

function showResuit () {
    endTime = Date.now();
    $('h1').text((endTime - startTime) +'ms');
    $('h2').text('點擊頁面再來一次');
    $('body').css('background-color', 'blue');
    color = 'b';
    
    if((endTime - startTime) < best) {
        best = (endTime - startTime);
    }
    $('h3').text('最佳紀錄：' + best);
}