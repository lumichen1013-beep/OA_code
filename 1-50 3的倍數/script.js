// 創造一個函式指令 hello：

//function hello () {
//    var al = [];
//    // 讓網頁跳出文字訊息：
//    
//    for (var i = 0; i < 50; i++) {
//        var v = i*3;
//        if (v < 50){
//            al.push(v);
//        }
//    }
//    $('p').text(al);
//}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function hello() {
    var al = [];
    $('button').fadeOut();
    for (var i = 0; i < 50; i++) {
        var v = i * 3;
        
        if (v < 50) {
            al.push(v);
            
            
            $('p').text(al.join(', '));
            
            
            await sleep(500);
        } else {
            break;
        }
    }
}
