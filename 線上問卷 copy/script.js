var feedback = DB.table('feedback');
$('#submit').click(submit);
$('#backToForm').click(backToForm);

// 前後台切換
$('#toggleButton').click(function () {
    $('#frontend').toggle();
    $('#backend').toggle();
    feedback.read({},updateTable);
});

// 送出表單
function submit () {
    $('#form').hide();
    $('#success').show();
    

    var serviceVal = $('#service').val();
    var mealVal = $('#meal').val();
    var priceVal = $('#price').val();
    var sourceVal = $('#source').val();
    var suggestionVal = $('#suggestion').val();
    var emailVal = $('#email').val();
    var subscribeVal = $('#subscribe').prop('checked');
    
    feedback.create({
        service:serviceVal,
        meal:mealVal,
        price:priceVal,
        source:sourceVal,
        suggestion:suggestionVal,
        email:emailVal,
        subscribe:subscribeVal,
    });
    
    feedback.read({},updateTable);
};

// 更新後台面
function updateTable (data) {
    
    
    
    $("tbody").empty();
    
    data.forEach(function (d){
        // console.log('jaja');
        var row = `
            <tr>
                <td>${d.service}</td>
                <td>${d.meal}</td>
                <td>${d.price}</td>
                <td>${d.source}</td>
                <td>${d.suggestion}</td>
                <td>${d.email}</td>
                <td>${d.subscribe}</td>
            </tr>
        `;
        $('tbody').append(row);
    });
    
    
    
}

// 重新填寫表單
function backToForm () {
    $('#success').hide();
    $('#form').show();
    var serviceVal = $('#service').val(5);
    var mealVal = $('#meal').val(5);
    var priceVal = $('#price').val(5);
    var sourceVal = $('#source').val(5);
    var suggestionVal = $('#suggestion').val(':(');
    var emailVal = $('#email').val('@_@');
    var subscribeVal = $('#subscribe').prop('checked',false);
}
