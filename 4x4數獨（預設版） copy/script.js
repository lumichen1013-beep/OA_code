var maze = [
    [0, 0, 0, 3],
    [0, 3, 2, 0],
    [3, 0, 4, 0],
    [0, 0, 0, 1],
]
var grid = new Sudoku(maze); //初始化


//「破解」按鈕按下時執行此函式
function autoplay () {
    count = 0;
    resolve();
    console.log('遞迴嘗試了 ' + count + ' 次！');
}

function resolve () {

    //限制遞迴次數避免網頁癱瘓
    if (count >= 1000) return;
    count++;
    
    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 4; x++) {
            if (grid[y][x] == 0) {
                var arr = [];
                for (var i = 0; i < 4; i++) {
                    arr.push(grid[y][i]);
                }

                for (var i = 0; i < 4; i++) {
                    arr.push(grid[i][x]);
                }

                var offsetX = x - x % 2;
                var offsetY = y - y % 2;
                arr.push(grid[offsetY + 0] [offsetX + 0]);
                arr.push(grid[offsetY + 1] [offsetX + 0]);
                arr.push(grid[offsetY + 0] [offsetX + 1]);
                arr.push(grid[offsetY + 1] [offsetX + 1]);

                for (var k = 0; k <= 4; k++) {
                    if (arr.indexOf(k) == -1) {
                        grid[y][x] = k;
                        var result = resolve ();
                        if(result == true){
                            return true;
                        }else{
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