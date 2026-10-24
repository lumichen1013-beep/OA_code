var answer;
var answerBtn; // 儲存正確答案的按鈕
var points = 0;

// 預設執行產生題目
question(); 

// 點擊下一題按鈕產生題目
$('#next').click(next);
function next () {
    $('#a, #b, #c, #d').addClass('blue');
    $('#a, #b, #c, #d').removeClass('red');
    $('#a, #b, #c, #d').removeClass('green');
    question ();
}

// 產生題目
function question () {
    var a = randomWorld ();
    $('#a').text(a.zh);
    var b = randomWorld ();
    $('#b').text(b.zh);
    var c = randomWorld ();
    $('#c').text(c.zh);
    var d = randomWorld ();
    $('#d').text(d.zh);
    
    if (Math.random()>0.5) {
        answer = a.en;
        answerBtn = a.zh;
    } else if (Math.random()>0.5) {
        answer = b.en;
        answerBtn = b.zh;
    } else if (Math.random()>0.5) {
        answer = c.en;
        answerBtn = c.zh;
    } else {
        answer = d.en;
        answerBtn = d.zh;
    }
    $('h2').text(answer);
}

$('#a').click(check);
$('#b').click(check);
$('#c').click(check);
$('#d').click(check);
function check () {
    if ($(this).text() == answerBtn) {
        $(this).addClass('green');
        $(this).removeClass('red');
        $(this).removeClass('blue');
        points++;
    } else {
        $(this).addClass('red');
        $(this).removeClass('green');
        $(this).removeClass('blue');
        points = 0;
        
        if ($('#a').text() == answerBtn) {
            $('#a').addClass('green');
            $('#a').removeClass('red');
            $('#a').removeClass('blue');
        }
        if ($('#b').text() == answerBtn) {
            $('#b').addClass('green');
            $('#b').removeClass('red');
            $('#b').removeClass('blue');
        }
        if ($('#c').text() == answerBtn) {
            $('#c').addClass('green');
            $('#c').removeClass('red');
            $('#c').removeClass('blue');
        }
        if ($('#d').text() == answerBtn) {
            $('#d').addClass('green');
            $('#d').removeClass('red');
            $('#d').removeClass('blue');
        }
    }
    $('h1').text('連續答對' + points + '題');
}

function randomWorld () {
    var rand = Math.floor(Math.random()*dict.length);
    return dict[rand];
}