$('#showProdPage').click(showProdPage);
$('#showCartPage').click(showCartPage);
$('#showInfoPage').click(showInfoPage);
$('#showAdminPage').click(showAdminPage);



// 顯示商品列表頁面
function showProdPage () {
    $(".page").hide();
    $("#prodPage").show();
    $(".tab").removeClass('active');
    $("#showProdPage").addClass('active');
}

// 顯示購物車頁面
function showCartPage () {
    $(".page").hide();
    $(".tab").removeClass('active');
    $("#cartPage").show();
    $("#showCartPage").addClass('active');
}

// 顯示訂單資訊頁面
function showInfoPage () {
    $(".page").hide();
    $("#infoPage").show();
    $(".tab").removeClass('active');
    $("#showInfoPage").addClass('active');
}

// 顯示管理後台頁面
function showAdminPage () {
    $(".page").hide();
    $("#adminPage").show();
    $(".tab").removeClass('active');
    $("#showAdminPage").addClass('active');
}


var order = DB.table('order'); // 訂單的資料表
$('.buy').click(buy);
$('#submit').click(submit);
$('#search').click(search);
$('#cancel').click(cancel);
$('#updateAdminPage').click(updateAdminPage);
$('#updateOrderStatus').click(updateOrderStatus);


// 點擊「購買」按鈕
function buy () {
    var name = $(this).data('name');
    var price = $(this).data('price');
    showCartPage();
    $('#cartName').text(name);
    $('#cartPrice').text(price);
    
}

// 送出訂單
function submit () {
    var nameVal = $('#cartName').text();
    var priceVal = $('#cartPrice').text();
    var amountVal = $('#cartAmount').val();
    var phoneVal = $('#cartPhone').val();
    var addressVal = $('#cartAddress').val();
    
    if (amountVal < 0 || phoneVal == 0 || addressVal == ' ') {
        alert('資料有誤');
    } else {
        order.create({
            name:nameVal,
            amount:amountVal, 
            price:priceVal*amountVal,
            phone:phoneVal,
            address:addressVal,
            status:'訂單成立'
        }, updateInfoPage);
        showInfoPage ();
    }

    
}

// 顯示訂單查詢資訊
function updateInfoPage (data) {
    $('#infoId').text(data.id);
    $('#infoStatus').text('干吾底事');
    $('#infoName').text(data.name);
    $('#infoAmount').text(data.amount);
    $('#infoPrice').text(data.price);
    $('#infoPhone').text(data.phone);
    $('#infoAddress').text(data.address);
}


// 訂單查詢
function search () {

}

// 後台查詢所以訂單資訊
function updateAdminPage () {

}

// 管理後台將訂單資訊顯示在表格上
function updateTable (data) {

}

// 更新指定的訂單狀態
function updateOrderStatus () {

}

// 取消訂單
function cancel () {

}
