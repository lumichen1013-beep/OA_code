$(window).focus();
var record = DB.table('record'); // 資料庫中用來紀錄遊戲分數的資料表
var userName = USER_NAME; // 遊戲玩家的名字
var startTime; // 遊戲開始時間
var endTime; // 遊戲結束時間
var count = 0; // 紀錄玩家步數(按下次數)
var qwe = true;

$('body').keydown(keydownHandler); // 任何按鍵被按下時執行 keydown 指令


function keydownHandler (event) {
    // 使用 alert 來示範按鍵對應的 keyCode
    //var arrow = alert(event.which);
    if (count == 1) {
        startTime = new Date();
    }
    var arrow = event.which;
    //console.log(count);
    if (arrow == 37 && count % 2 == 0) {
        leftStep ();
        count++;
    }else if(arrow == 39 && count % 2 != 0){
        rightStep ();
        count++;
    }
    if (count < 101) {
        $('#steps').text(count + 'm');
    } else {
        
        endTime = new Date();
        if (qwe){gameover ();}
    }
    
    
}   


// 左鍵被按下時
function leftStep () {
    $('#img_wait').addClass('hide');
    $('#img_left').removeClass('hide');
    $('#img_right').addClass('hide');
    $('#btn_left').addClass('active');
    $('#btn_right').removeClass('active');
}

// 右鍵被按下時
function rightStep () {
    $('#img_wait').addClass('hide');
    $('#img_right').removeClass('hide');
    $('#img_left').addClass('hide');
    $('#btn_right').addClass('active');
    $('#btn_left').removeClass('active');
}

// 遊戲結束
function gameover () {
    $('#img_gameover').removeClass('hide');
    $('#img_wait').addClass('hide');
    $('#img_left').addClass('hide');
    $('#img_right').addClass('hide');
    $('#btn_left').removeClass('active');
    $('#btn_right').removeClass('active');
    
    
    time = (endTime - startTime)/1000;
    
    record.create({
        name:userName,
        time:time,
    });

    record.read({},{
        $orderBy:{time:1},
        $limit:5,
    },showRank);
    
    qwe = false;
}

// 顯示排行榜
function showRank (data) {
    $('table').removeClass('hide');
    var i = 1;
    data.forEach(function(d){
        
        var row = `<tr>
                    <td>${i}</td>
                    <td>${d.name}</td>
                    <td>${d.time} sec</td>
                </tr>`;
            
        $('tbody').append(row);
        i++;
    });
}
