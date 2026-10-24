$('#btn1').click(rstart);
$('#btn2').click(loop);
$('#btn3').click(op);
var ln = -1;

var start = false;
var sd = 3;
var luckynum1;
var luckynum2;
var luckynum3;
var timer1;
var timer2;
var timer3;


function op() {
    luckynum1 = (Math.floor(Math.random()*5) + 5);
    $('#1').text(luckynum1);
    $('#2').text(luckynum1);
    $('#3').text(luckynum1);
    if (luckynum1 == luckynum1 && luckynum1 == luckynum1) {
    ln ++;
    } 
    $('h1').text('中獎數:' + ln);
}

function loop() {
    if (sd == 0) {
        clearInterval(timer1);
        sd += 1;
    } else if (sd == 1) {
        clearInterval(timer2);
        sd += 1;
    } else if (sd == 2) {
        clearInterval(timer3);
        sd += 1;
    }

}

function rstart () {

    sd = 0;

    timer1 = setInterval(function range1() {
        luckynum1 = (Math.floor(Math.random()*5) + 5);
        $('#1').text(luckynum1);
    }, 100);
    timer2 = setInterval(function range2() {
        luckynum2 = (Math.floor(Math.random()*5) + 5);
        $('#2').text(luckynum2);
    }, 100);
    timer3 = setInterval(function range3() {
        luckynum3 = (Math.floor(Math.random()*5) + 5);
        $('#3').text(luckynum3);
    }, 100);
}




if (luckynum1 == luckynum2 && luckynum2 == luckynum3) {
    ln ++;
}

$('h1').html( '中獎數:' + ln);

