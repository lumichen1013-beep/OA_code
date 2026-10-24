// 創造一個函式指令 hello：
var tv = [`
            <p>
             O/
            <br>
            /|
            <br>
            / |
            <br>
            嗨你好～
        </p>
        `, 
        `
            <p>
             O
            <br>
            /|>
            <br>
            / |
            <br>
            我是火柴人!
        </p>
        `,
        `
            <p>
            LO/
            <br>
             |
            <br>
            / |
            <br>
            歡迎來到2025小故事合集～
        </p>
        `];
function start () {
    // 讓網頁跳出文字訊息：
    //alert('叩叮：\n嗨你好～ 讓我們一起加油寫出漂漂亮亮的網頁唄！');
    $('p').empty();
    async function processTv(tv) {
    for (let i = 0; i < tv.length; i++) {
        $('p').append(tv[i]);
           // 你原本要做的事
        await delay(1000);    // 等 1 秒
    }
}
        
    
    
    $('p').append(tv[i]);
}