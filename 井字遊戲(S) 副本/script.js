var current = 'O';
var a;
var b;
var c;
var d;
var e;
var f;
var g;
var h;
var i = $('#i').text();
$('.grid div').click(place);
function place() {
    
    $(this).text(current);
    
    a = $('#a').text();
    b = $('#b').text();
    c = $('#c').text();
    d = $('#d').text();
    e = $('#e').text();
    f = $('#f').text();
    g = $('#g').text();
    h = $('#h').text();
    i = $('#i').text();
    
    check(a, b, c);
    check(d, e, f);
    check(g, h, i);
    check(a, d, g);
    check(b, e, h);
    check(c, f, i);
    check(a, e, i);
    check(c, e, g);
    
    if (current == 'O') {
        current = 'X';
        $(this).addClass('orange');
        $(this).removeClass('gray');
        
    } else if (current == 'X') {
        current = 'O';
        $(this).addClass('red');
        $(this).removeClass('gray');
    }
}



$('button').click(again);

function check(x, y, z) {
    if (x == y && y == z && x!= '') {
        $('h1').text(x + '獲勝');
    }
}

function again() {
    current = 'O'
    $('h1').text('Tic Tac Toe');
    $('.grid div').text('');
    $('.grid div').removeClass('red');
    $('.grid div').removeClass('orange');
    $('.grid div').addClass('gray');
}