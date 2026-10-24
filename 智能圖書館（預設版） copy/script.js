// 哈利波特神秘的魔法石 - JK羅琳
var b1 = 'Harry Potter and the Philosopher’s Stone by JK Rowling';

// 愛麗絲夢遊仙境 - 查爾斯·路特維奇
var b2 = 'Alice’s Adventures in Wonderland by Lewis Carroll';

var up = 1000;
var low = 0;
//線性
/*for (var i = 0;i<1000;i++){
    var result = books.search(i);
    if (result == b1){
        console.log(result);
        break;
    }
}*/

for (var i = 0;i<1000;i++){
    var center = Math.floor((up+low)/2);
    var result = books.search(center);
    if (result > b1){
        up = center;
    } else if (result < b1){
        low = center;
    }
    if (result == b1){
        console.log(result);
        break;
  }
}

