
$('#img-slim').hide();
$('#img-normal').hide();
$('#img-fat').hide();
$('#btn-start').on('click', getResult);
function getResult() {
    var h = $('#input1').val();
    var w = $('#input2').val();
    h = parseFloat (h);
    w = parseFloat(w);
    h = h/100;
    var bmi = w/(h*h);
    bmi = bmi.toFixed(2);
    $('#bmi').html('BMI 計算結果：' + bmi);
    $('img').hide();
    var text;
    if (bmi <= 18.5) {
        text = '太輕了!';
        $('#img-slim').show();
    }else if (8.5 < bmi&&bmi <= 24.9) {
        text = '正常!';
        $('#img-normal').show();
    }else {
        text = '過胖喔!';
        $('#img-fat').show();
    }
    $('#bmi').html('BMI 計算結果：' + bmi+ text);
}