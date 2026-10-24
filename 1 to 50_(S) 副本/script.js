var cards = $('.card');
var count = 1;
var startTime = Date.now();

$('.card').click(check);

function check () {
    var nam = Number($(this).text());
    console.log(nam);
    if (count == nam && nam <= 25) {
        $(this).text(nam + 25);
        count ++;
    }
    if (count == nam && nam >= 25) {
        $(this).addClass('hide');
        count ++;
    }
    if (count == 51) {
        $('.card').addClass('show');
        $('.card').removeClass('hide');
        $('.card').css('background-color', 'yellow');
        $('.card').text('');
        var endTime = Date.now();
        var time = (endTime - startTime)/1000;
        $(cards[11]).text('結果');
        $(cards[12]).text(time);
        $(cards[13]).text('秒');
    }
}