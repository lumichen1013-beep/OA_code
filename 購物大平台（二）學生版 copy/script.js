$('#showProdPage').click(showProdPage);
$('#showCartPage').click(showCartPage);
$('#showInfoPage').click(showInfoPage);
$('#showAdminPage').click(showAdminPage);

// 顯示商品列表頁面
function showProdPage () {
    $('.page').hide();
    $('#prodPage').show();
    $('.tab').removeClass('active');
    $('#showProdPage').addClass('active');
}

// 顯示購物車頁面
function showCartPage () {
    $('.page').hide();
    $('#cartPage').show();
    $('.tab').removeClass('active');
    $('#showCartPage').addClass('active');
}

// 顯示訂單資訊頁面
function showInfoPage () {
    $('.page').hide();
    $('#infoPage').show();
    $('.tab').removeClass('active');
    $('#showInfoPage').addClass('active');
}

// 顯示管理後台頁面
function showAdminPage () {
    $('.page').hide();
    $('#adminPage').show();
    $('.tab').removeClass('active');
    $('#showAdminPage').addClass('active');
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
    $('#cartName').text(name);
    $('#cartPrice').text(price);
    showCartPage();
}

// 送出訂單
function submit () {
    var nameVal = $('#cartName').text();
    var priceVal = $('#cartPrice').text();
    var amountVal = $('#cartAmount').val();
    var phoneVal = $('#cartPhone').val();
    var addressVal = $('#cartAddress').val();
    
    if (amountVal > 0 && phoneVal != '' && addressVal != '') {
        order.create({
            name: nameVal,
            amount: amountVal,
            phone: phoneVal,
            address: addressVal,
            price: priceVal*amountVal,
            status: '訂單成立',
        }, updateInfoPage);
        showInfoPage();   
    } else {
        alert('資料有誤！');
    }
}

// 顯示訂單查詢資訊
function updateInfoPage (data) {
    if (data == undefined){
        $('#nodata').show();
        $('#infoList').hide();
    } else {
        $('#nodata').hide();
        $('#infoList').show();
        $('#infoId').text(data.id);
        $('#infoStatus').text(data.status);
        $('#infoName').text(data.name);
        $('#infoAmount').text(data.amount);
        $('#infoPhone').text(data.phone);
        $('#infoAddress').text(data.address);
        $('#infoPrice').text(data.price); 
    }
    
    
    
}

// 訂單查詢
function search () {
    
    var orderId = $('#orderId').val();
    order.read({id:orderId}, function(data){
        updateInfoPage(data[0]);
    });
}

// 後台查詢所以訂單資訊
function updateAdminPage () {
    order.read({}, updateTable);
}

// 管理後台將訂單資訊顯示在表格上
function updateTable (data) {
    $('tbody').empty();
    
    data.forEach(function(o) {
        row = `
        <tr>
        <td>${o.id}</td>
        <td>${o.name}</td>
        <td>${o.amount}</td>
        <td>${o.status}</td>
        <td>${o.phone}</td>
        <td>${o.address}</td>
        <td>${o.price}</td>
        </tr>
        `;
        
        $('tbody').append(row);
    });
}

// 更新指定的訂單狀態
function updateOrderStatus () {
    var orderId = $('#adminOrderId').val();
    var status = $('#status').val();
    $('#adminOrderId').val('');
    order.update({id:orderId}, {status:status});
    updateTable();
}

// 取消訂單
function cancel () {
    var orderId = $('#orderId').val();
    order.update({ id: orderId },{ status: '已取消' },search);
}
