var places = ['快樂的', '傷心的', '生氣的', '不爽的']
// var places = ['士林','北投','木柵','三重','南港','淡水','新店','蘆洲','古亭','中壢','池上','汐止','三峽'];
var stars = ['皮卡丘','水箭龜','小火龍','大比鳥','藏瑪然特','呆火鱷','洛托姆','喵喵','妙蛙花','果然翁','巴大蝶'];
$('.js-btn') .click(makepoketmon);
function makepoketmon(){
    var rand1 = Math.floor(Math.random()*places.length);
    var rand2 = Math.floor(Math.random()*stars.length);
    console.log(rand1);
    console.log(rand2);
    console.log('_______');
    $('.js-result') .text(places[rand1] + stars[rand2])
}