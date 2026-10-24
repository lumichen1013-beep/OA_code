words = ['努力就會有回報', '心想事成', '對親朋好友好一點', '心平氣和地看待事物', '不要挑食,就會有好事發生'];
apple = 0;

$('#gold').hide();
$('#red').show();

// 創造一個函式指令 hello：
function hello () {
    $('h1').text(words[Math.floor(Math.random()*5)]);
    apple ++;
    
    if (apple % 2 == 0) {
        $('#gold').hide();
        $('#red').show();
    } else {
        $('#gold').show();
        $('#red').hide();
    }
    
}