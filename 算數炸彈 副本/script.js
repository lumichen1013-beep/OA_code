var level = 0;
var check;
var check2;
var timer = 0;

start();

$('#btn-yes').click(function() {
    check = true;
    checking();
});
$('#btn-no').click(function() {
    check = false;
    checking();
});

function start () {
    level ++;
    timer = 0;
    $('#level').text('level:' + level);
    
    var a = Math.floor(Math.random()*10);
    var b = Math.floor(Math.random()*10);
    var answer = a + b;
    
    var error = Math.floor(Math.random()*4+1);
    //var error1 = Math.ceil(Math.random()*4+1);
    
    if (Math.random() > 0.5) {
        $('#formula').text(a + ' + ' + b + ' = ' + answer);
        check2 = true;
    } else {
        answer += error;
        $('#formula').text(a + ' + ' + b + ' = ' + answer);
        check2 = false;
    }
}

function checking () {
    if (check == check2) {
        start();
    } else {
        gameOver();
        timer = 100
    }
}

function gameOver () {
    $('button').hide();
    $('#gameover').show();
}

setInterval(function() {
    if (timer <= 100) {
        timer += 0.1;
        $('#bar').css('width', timer+'%');
    } else {
        gameOver();
    }
});