// 按鈕觸發
$('#ntd').keyup(ntd_to_else);
$('#jpy').keyup(jpy_to_else);
$('#usd').keyup(usd_to_else);
// 功能
function ntd_to_else () {
    var ntd = $('#ntd').val();
    var jpy = (ntd / 0.2012).toFixed(3);
    var usd = (ntd / 29.67).toFixed(3);
    $('#jpy').val(jpy);
    $('#usd').val(usd);
}

function jpy_to_else () {
    var jpy = $('#jpy').val();
    var ntd = (jpy * 0.1884).toFixed(3);
    var usd = (jpy * 0.1884 / 29.67).toFixed(3);
    $('#ntd').val(ntd);
    $('#usd').val(usd);
}

function usd_to_else () {
    var usd = $('#usd').val();
    var ntd = (usd * 29	).toFixed(3);
    var jpy = (usd * 29 / 0.2012).toFixed(3);
    $('#jpy').val(jpy);
    $('#ntd').val(ntd);
}
