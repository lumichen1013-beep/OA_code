// 選擇相對emoji放入陣列
var answers = [
    '🐢', '🎩', '🤣', '💯', '🪸', '👻', '🏙️', '🐲',
    '🐢', '🎩', '🤣', '💯', '🪸', '👻', '🏙️', '🐲'
];
var first;
var second;
var speed = 1;

var firstEl;
var secondEl;

var lock = false;

for (var i = 0; i < 20; i++) {
    var rand1 = Math.floor(Math.random()*16);
    var rand2 = Math.floor(Math.random()*16);
    var tmp = answers[rand1];
    answers[rand1] = answers[rand2];
    answers[rand2] = tmp;
}

$('button').click(function () {
        //console.log($(this).data('index'))
        
        if (lock == false) {
            
            $('h1').text('翻開'+speed+'次');
            if (first == undefined) {
            first = answers[$(this).data('index')];
            $(this).text(first);
            firstEl = this;
            speed++;
            console.log(1);
        }else if (second == undefined){
            second = answers[$(this).data('index')];
            $(this).text(second);
            secondEl =  this;
            speed++;
            //console.log(2);
            if (first == second) {
                first = undefined;
                second = undefined;
                //console.log(4);
            }else{
                first = undefined;
                second = undefined;
                lock = true;
                setTimeout(function() {
                    $(firstEl).text('❓');
                    $(secondEl).text('❓');
                    lock = false;
                }, (1000-speed*20));
                
            }
        }
        }
        
            
            
        
        
});