$('#guess').click(function () {
    var g = prompt('請輸入 0 - 1000 之間的數字？'); //讀取玩家輸入的數字
    var r = game.guess(g); //猜答案
    console.log(r); // 印出結果
});

$('#restart').click(function () {
    game.start(); //開始新的一局
});


var low = 0;
var up = 1000;
game.start();
// 暴力
/*for (var i = 0;i< 1001;i++){
    var result = game.guess(i);
    if (result == '答對'){
        game.start();
        break;
    }
}
*/
// 每十個(myself)
/*for (var i = 0;i< 101;i++){
    var result;
    if (result == '答對'){
        break;
        console.log('jjjjj');
    }
    if (result == '太大') {
        for (var s = i*10-10;s>i*10-20;s--)
        if (result!='答對'){
            result = game.guess(s);
        }

        
    } else if (result != '答對'&&result!='太大'){
        result = game.guess(i*10);
    }
    
}
*/

//二分法
for (var s = 0;s < 1001;s++){
    var low = 0;
    var up = 1000;
    
    for (var i = 0;i< 1001;i++){
    var center = Math.floor((low+up)/2);
    var result = game.guess(center);
    if (result == '太大') {
        up = center;
    } else if (result == '太小') {
        low = center;
    } else if (result == '答對'){
        game.start();
        break;
    }
}

}
