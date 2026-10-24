// 創造一個函式指令 hello：
var num;
var yn;

function IsPrime (n) {
    num = Number($('input').val());
    if (n < -1) {return false}
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {return false}
    }
    
    return true;
}

$('button').click(function() {
    const result = IsPrime(num);
    yn = result;
    if (isNaN(num)) {
        $('#yn').text('請輸入有效數字！');
    } else if (yn) {
        $('#yn').text('結果:' + '是');
    } else {
        $('#yn').text('結果:' + '否');
    }
});