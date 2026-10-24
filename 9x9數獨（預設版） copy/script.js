// 史上最難的數獨題目
var maze = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0],
]

var grid = new Sudoku(maze); //初始化


//-------------------- 破解題目的演算法 --------------------//

//「破解」按鈕按下時執行此函式
function autoplay () {
    count = 0;
    resolve();
    console.log('遞迴嘗試了 ' + count + ' 次！');
}

function resolve () {

    //限制遞迴次數避免網頁癱瘓
    if (count >= 300000) return;
    count++;

    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            if (grid[y][x] == 0) {
                var arr = [];
                for (var i = 0; i < 9; i++) {
                    arr.push(grid[y][i]);
                }

                for (var i = 0; i < 9; i++) {
                    arr.push(grid[i][x]);
                }

                var offsetX = x - x % 3;
                var offsetY = y - y % 3;
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        arr.push(grid[offsetY + i] [offsetX + j]);
                    }
                }
                
                var random_arr = shuffle();
                for (var k = 0; k < 9; k++) {
                    var candidate = random_arr;
                    if (arr.indexOf(candidate) == -1) {
                        grid[y][x] = candidate;
                        var result = resolve ();
                        if (result == true) {
                            return true;
                        } else {
                            grid[y][x] = 0;
                        }

                    }
                }
                return false;
            }

        }
    }
    return true;

}


//-------------------- 產生題目的演算法 --------------------//

//「新遊戲」按鈕按下時執行此函式
function newGame () {
    count = 0;
    clearAll();
    generator();
    randomHide();
    console.log('遞迴嘗試了 ' + count + ' 次！');
}

function generator () {

    //限制遞迴次數避免網頁癱瘓
    if (count >= 300000) return;
    count++;


}

// 清空數獨
function clearAll () {
    for (var y = 0; y < 9; y++) {
        for (var x = 0; x < 9; x++) {
            grid[y][x] = 0;
        }
    }
}

// 洗牌演算法
function shuffle() {
    var arr = [1,2,3,4,5,6,7,8,9];
    for (var i = 0; i < 100; i++) {
        var id1 = Math.floor(Math.random()*9);
        var id2 = Math.floor(Math.random()*9);
        var temp = arr[id1];
        arr[id1] = arr[id2];
        arr[id2] = temp;
    }
    return arr;
}

// 隨機挖空完整的數獨
function randomHide() {
    var cnt = 0;
    while(cnt < 56) {
        var randX = Math.floor(Math.random()*9);
        var randY = Math.floor(Math.random()*9);
        if(grid[randY][randX] != 0) {
            grid[randY][randX] = 0;
            cnt++;
        }
    }
}