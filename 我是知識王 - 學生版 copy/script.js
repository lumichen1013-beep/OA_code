var record = DB.table('record'); // 記錄玩家的分數
var answer; // 記錄當前題目的正確答案
var ansPlace;
var score = 0; // 記錄當前玩家獲得的分數
var counter = 0; // 紀錄目前作答的題目數量
var username;

$('#start').click(start); //「開始」按鈕被點擊時時執行 start
$('.option').click(answerQuestion); // 四個選項按鈕任何一個被點擊時執行 answerQuestion
$('#next').click(showQuestion); //「下一題」按鈕被點擊時執行 showQuestion

$('.option').attr('disabled', true); // 禁止選項按鈕被點擊

//record.delete({
  //  name:'h'
//});
// 開始挑戰
function start () {
    $('#start').hide();
    showQuestion();
    $('.option').attr('disabled', false);
    username = prompt('你哪咖?');
    //username = USER_NAME;
}

// 從題庫中隨機選出題目並顯示
function showQuestion () {
    var rand = Math.floor(Math.random()*questions.length);
    var q = questions.splice(rand, 1)[0];
    //console.log(q);
    
    counter += 1;
    $('#counter').text(counter + '/10');
    $('#content').text(q.content);
    $('#a').text(q.a);
    $('#b').text(q.b);
    $('#c').text(q.c);
    $('#d').text(q.d);
    
    answer = q.answer;
    
    $('.option').removeClass('green');
    $('.option').removeClass('red');
    $('#next').hide();
    $('.option').attr('disabled', false);
}

// 作答並判斷結果並顯示
function answerQuestion () {
    var option = $(this).attr('id');
    if (option == answer) {
        score ++;
        $(this).addClass('green');
    } else {
        $(this).addClass('red');
        $(`#${answer}`).addClass('green');
        $('.option').attr('disabled', true);
    }
    if (counter < 10) {
        $('#next').show();
    } else {
        gameover();
    }
}

// 遊戲結束紀錄玩家分數
function gameover () {
    record.create({
        name : username,
        score:score
    });
    record.read({}, {
        $orderBy:{
            score: -1
        }
    },console.log);
    record.read({}, {
        $orderBy:{
            score: -1
        }
    },showResult);
}

// 顯示排行榜
function showResult (data) {
    $('#result').show();
    $('#score').text('你的分數:' + score);
    data.forEach(function(d){
        var row = `<li>${d.name}:${d.score}</li>`;
        $('ol').append(row);
    });
}