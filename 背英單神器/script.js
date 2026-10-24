// 創造一個函式指令 hello：
var questList = [];
var score = (0);
var benAns;

$('#win').hide();

function hello () {
    alert('叩叮：\n嗨你好～ 讓我們一起加油做完一些題目唄！');
    var w = prompt('叩叮：\n要背的單字(英+空格+中文):');
    var text = w.split(" ");

    var quest = new Map();
    quest.set("eng", text[0]);
    quest.set("chi", text[1]);
    quest.set("yn", 'N');
    questList.push(quest);



    //小抄
    /*
    var data = "<tr><td>eng</td><td>chi</td></tr>";
    questList.forEach(item=> {
        data += "<tr><td>"+ item.get('eng') + "</td><td>"+item.get('chi')+"</td></tr>";
    });
    $("#questTable").html(data);
    */
}


let successCnt = 0;

function initial() {
    questList.forEach((item) => {
        item.set('yn', 'N');
    });
    $('#score').html('score:'+score);

}


function test () {
    initial();


    var q = Math.floor(Math.random()*questList.length);
    for (let i = 0; i < questList.length; i++) {
        while (questList[q].get('yn') == 'Y' && successCnt < questList.length) {
            q = Math.floor(Math.random()*questList.length);
        }
        
        a = prompt('題目'+ questList[q].get("eng"));

        if (a == questList[q].get("chi")) {
            score += 1;
            successCnt++;
            $('#score').html('score:'+score);
            $('#lose').hide();
            $('#win').delay(1500).show();
        } else {
            score -= 1;
            $('#score').html('score:'+score);
            $('#win').hide();
            $('#lose').delay(1500).show();


        }
        questList[q].set('yn', 'Y');
        //$('#score').html('Game Over  score:'+ score);


    }
}