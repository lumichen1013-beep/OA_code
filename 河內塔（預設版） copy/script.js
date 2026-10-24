setSpeed(10); //每秒移動的次數

//按下「自動破解」時會執行此函式
function cracker (size) {
    drag('a', 'c') //移動指令
    move(size,'a','c','b');
}

//移動 size 層從(from)位置，移動到(to)位置，過程中暫放在(tmp)位置
function move (size, from, to, tmp) {
    if (size > 1){
        move(size-1, from, tmp, to);
        move(1, from, to, tmp);
        move(size-1, tmp ,to, from);
    } else {
        drag(from, to);
    }
    
}