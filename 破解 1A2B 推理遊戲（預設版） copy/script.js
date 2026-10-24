$('#start').click(start); //開始遊戲
$('#guess').click(function () {
    var str = prompt('輸入四位不重複數字');
    guess(str); //將輸入的數字丟進遊戲去猜
});
$('#crack').click(crack); //破解遊戲

var answer = undefined; //存放解答
var count = 0; //紀錄猜的字數

start(); //預設開始遊戲

// 開始新的一局遊戲
function start () {
    $('#textarea').append('\n========== 開始新的遊戲 ==========\n\n');
    count = 0; //歸零紀錄猜的次數
    var list = getList();
    
    var rand = Math.floor(Math.random()* list.length);
    answer = list[rand];

}

// 傳入四位數字的字串 str 並將結果顯示到畫面上
function guess (str) {
    var result = diff(str, answer);
    count++;
    $('#textarea').append(`${count} 猜${str} A:${result.a} B:${result.b}\n`);
    if (result.a == 4) {
        $('#textarea').append("============ 猜對了 ============");
    }
    return result;
}

// 取得所有可能的答案的組合
function getList () {
    var list = [];
    for (var i = 123; i < 9877; i++) {
        var t = i.toString();
        if (t[0] !== t[1] && t[0] !== t[2] && t[0] !== t[3] && t[1] !== t[2] && t[1] !== t[3] && t[2] !==t[3]) {
            
            if(t.length < 4) {
                t = "0" + t;
            }
            list.push(t);
        }
        
    }
    console.log(list);
    return list;
}

// 比較 s1, s2 並返回一帶有 a,b 資訊個物件來表示結果
// a 表示位置一樣且數字一樣
// b 表示數字有出現，但位置不一樣
function diff (s1, s2) {
    var a = 0;
    var b = 0;
    
    
    for (var i = 0; i < 4; i++) {
        if (s1[i] == s2[i]) {
            a += 1;
        }
        if (s2.indexOf(s1[i]) != -1 && s2.indexOf(s1[i]) != i) {
            b += 1;
        }
    }
    
    // { a: a, b: b } 物件中
    // 冒號左邊的 a, b 是屬性
    // 冒號右邊的 a, b 其對應的資料（var a = 0; var b = 0;）
    return { a: a, b: b };
}

// 用程式自動破解 1A2B 遊戲
function crack () {
    var list = getList();
    /*//noprotect
    for (var i = 0; i < list.length; i++) {
        var result = guess(list[i]);
        if (result.a == 4) {
            break;
        }
    }
    */
    for (var i = 0; i < list.length; i++) {
        var g = list.pop();
        var result = guess(g);
        if (result.a == 4) {break}
        
        for (var j = 0; j < list.length; j++) {
            var result2 = diff(list[j], g);
            if(result.a != result2.a || result.b != result2.b) {
                list.splice(j, 1);
                j--;
            }
        }
    }
}