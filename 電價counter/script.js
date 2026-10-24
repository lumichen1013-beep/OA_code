// 創造一個函式指令 hello：
function hello () {
    // 讓網頁跳出文字訊息：
    var m = 0;
    var n = prompt('叩叮：\n輸入度數');
    var l1 = 300;
    var l2 = 500;
    if (0 < n && n <= 300) {
        m = Math.round(n * 2.55);
    } else if (300 < n && n <= 500) {
        
        m = Math.round((n-l1) * 3.8 + l1 * 2.55);
    } else if (500 < n && n <= 1000) {
        
        m = Math.round((n-l2) * 6.44 + (l2 - l1) * 3.8 + l1 * 2.55);
    }
    alert('結算金額:' + m);
}