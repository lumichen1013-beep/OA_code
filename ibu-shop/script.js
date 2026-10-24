shoplist = [];
shoplistnum = [];
var land = 0;
var money = 1000;
var moneyplus = 0;
var picture = 0;
var hide = 0;

$('#money').text('money:' + money);

$('#hello2').hide();
$('#hello3').hide();
$('#gohome').hide();
$('.landing').hide();
$('.shoping').hide();
$('.shopcar').hide();
$('.worker').hide();
$('#red').hide();
$('#blue').hide();
$('#green').hide();
$('#pocketmons').hide();
$('#seed').hide();

$('#shop').click(shop);
$('#shopcar').click(shopcar);
$('#work').click(work);
$('#gohome').click(gohome);
$('#buy_btn').click(buy);
$('.worker').click(worker);

$('#a').click(function() {
    addcar('鉛筆', 20);
    hide++;
});
$('#b').click(function() {
    addcar ('妙蛙種子', 150);
});
$('#c').click(function() {
    addcar ('寶可夢們', 200);
});
$('#d').click(function() {
    addcar ('工作+1', 20);
});
$('#e').click(function() {
    addcar ('好看的背景(水)', 200);
});
$('#f').click(function() {
    addcar ('好看的背景(光)', 200);
});
$('#g').click(function() {
    addcar ('火伊布', 100);
});
$('#h').click(function() {
    addcar ('水伊布', 100);
});
$('#i').click(function() {
    addcar ('葉伊布', 100);
});

// 創造一個函式指令 hello：
function hello () {
    $('#hello_word').html('你可以去[購物]把東加入[購物車]<br>再從[購物車]把東西送出完成購物');
    $('#hello1').hide();
    $('#hello3').hide();
    $('#hello2').show();
}
function hello2 () {
    $('#hello_word').html('另外可以去[工作]賺錢');
    $('#hello2').hide();
    $('#hello3').show();
}
function hello3 () {
    $('.hello').hide();
}

function shop () {
    land = 1;
    landing();
}

function shopcar () {
    land = 2;
    landing();
}

function work () {
    land = 3;
    landing();
}

function gohome () {
    land = 4;
    landing();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function landing () {
    $('.home').hide();
    $('.landing').show();
    $('#gohome').hide();
    $('.shoping').hide();
    $('.shopcar').hide();
    $('.worker').hide();

    await sleep(500);
    $('.landing').text('landing.');
    await sleep(500);
    $('.landing').text('landing..');
    await sleep(500);
    $('.landing').text('landing...');
    await sleep(500);
    $('.landing').text('landing');
    await sleep(500);
    $('.landing').text('landing.');
    await sleep(500);
    $('.landing').text('landing..');
    await sleep(500);
    $('.landing').text('landing...');

    $('.landing').hide();

    if (land == 1) {
        $('.shoping').show();
        $('#gohome').show();
    } else if (land == 2) {
         $('.shopcar').show();
         $('#gohome').show();
    } else if (land == 3) {
         $('.worker').show();
         $('#gohome').show();
    } else if (land == 4) {
         $('.home').show();
         if (picture == 1) {
               $('#red').show();
               $('#none').hide();
               $('#blue').hide();
               $('#green').hide();
        } else if (picture == 2) {
            $('#blue').show();
            $('#red').hide();
            $('#none').hide();
            $('#green').hide();
            $('#pocketmons').hide();
        } else if (picture == 3) {
            $('#green').show();
            $('#blue').hide();
            $('#red').hide();
            $('#none').hide();
            $('#pocketmons').hide();
        } else if (picture == 4) {
            $('#pocketmons').show();
            $('#green').hide();
            $('#blue').hide();
            $('#red').hide();
            $('#none').hide();
        } else if (picture == 5) {
            $('#seed').show();
        }
    }
    
}

var car = new Map();
var price = new Map();

function addcar (s, m) {
    if (car.has(s)) {
        car.set(s, car.get(s) + 1);
    } else {
        car.set(s, 1);
    }
    price.set(s, m);
    
    drawlist ()

}

function buy () {
    car.forEach((value, key)=> {
        if (money - (price.get(key) * value) >= 0){
            
            money -= (price.get(key) * value);
            if (car.has("工作+1")) {
                moneyplus += car.get("工作+1")
            }
            if (car.has("好看的背景(水)")) {
               $('body').css("background-image", "url('https://agirls.aottercdn.com/media/65c8646f-a003-4360-9870-63b4a101cea5.jpg')");
            }
            if (car.has("好看的背景(光)")) {
               $('body').css("background-image", "url('https://static.popdaily.com.tw/wp-content/uploads/2023/07/69ottv8qo8gsgwcg4o040c8kgrxf2o6-1000x563.jpg')");
            }
            if (car.has("火伊布")) {
                picture = 1;
                $('#red').addClass('home');
            }
            if (car.has("水伊布")) {
                picture = 2;
                $('#blue').addClass('home');
            }
            if (car.has("葉伊布")) {
                picture = 3;
                $('#green').addClass('home');
            }
            if (car.has("寶可夢們")) {
                picture = 4;
                $('#pocketmons').addClass('home');
            }
            if (car.has("妙蛙種子")) {
                picture = 5;
                $('#seed').addClass('home');
            }
            if (hide >9) {
                $('#pen').addClass('home');
            }
            
            car = new Map();
            price = new Map();
        }
    })
    drawlist ()
    $('#money').text('money:' + money);
}

function drawlist () {
    table = "<table>";
    table += "<tr>";
    table += "<th>";
    table += "商品";
    table += "</th>";
    table += "<th>";
    table += "數量";
    table += "</th>";
    table += "<th>";
    table += "價格";
    table += "</th>";
    table += "</tr>";
    car.forEach((value, key)=> {
        table += "<tr>";
        table += "<td>";
        table += key;
        table += "</td>";
        table += "<td>";
        table += value;
        table += "</td>";
        table += "<td>";
        table +=  price.get(key) * value ;
        console.log(value);
        table += "</td>";
        table += "</tr>";
    })
    $('#list').html(table);
}

function worker () {
    money += (1 + moneyplus)
    $('#money').text('money:' + money);
}
