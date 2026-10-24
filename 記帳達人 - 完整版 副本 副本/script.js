var account = DB.table('account');

console.log('bumb length =', $('#bumb').length)

$('#create').click(create); // 點擊「新增」新增一筆資料
$('.filter').click(filter); // 點擊「圖示」篩選所有資料
// $('.del').click(deleteScore);
$('.filter').click(filter);
$('#bumb').click(bumb);
//$('tbody').on('click', '.del', deleteScore);
//$('tbody').on('click',"button", deleteScore); 

// 專案一開始執行，預設查詢所有資料並更新至表格
account.read({}, updateTable);
//account.delete({})

// 新增一筆記帳紀錄到資料表並更新畫面
function create () {
    var type = $('#type').val();
    var date = $('#date').val();
    var cost = $('#cost').val();
    var note = $('#note').val();
    //var type = $(this).value;
    if (date == '') {
        alert('日期忘記填了喔');
        console.log('date');
    } else if (cost == '') {
        alert('價錢忘記填了喔');
        console.log('cost');
    } else {
        account.create({
            type : type,
            date : date,
            cost : cost,
            note : note
        });
        account.read({}, updateTable);
    }
    
    
}

// 將查詢的記帳紀錄 data 更新至畫面上
function updateTable (data) {
    var total = 0;
    $('tbody').empty();
    data.forEach(function(item){
        var i = Number(item.cost);
        var row = `
        <tr data-id="${item.id}">
            <td>${typeToEmoji (item.type)}</td>
            <td>${item.type}</td>
            <td>${item.date}</td>
            <td>${item.cost}元</td>
            <td>${item.note || ''}</td>
            <td><button onclick=deleteScore('${item.id}')>刪除</button></td>
        </tr>
        `;
        total += i;
        $('tbody').append(row);
    });
    $('#sum').text(total);
        
}

// 將類型的字串轉換成 emoji 符號
function typeToEmoji (type) {
    if (type == '食物') {
        return'🍖';
    } else if (type == '生活') {
        return'🏠';
    } else if (type == '交通') {
        return'🚌';
    } else if (type == '衣服') {
        return'👕';
    } else if (type == '學習') {
        return'📖';
    } else if (type == '娛樂') {
        return'🎮';
    }
    
}

// 依據類型查詢所有資料並更新至表格
function filter () {

}

function deleteScore(id) {
    var d = prompt('確定刪除?(y or n)')
    //let id = $(obj).data('id');
    //console.log(id);
    if ((d || '').toLowerCase() === 'y') {
        account.delete({id:id});
        account.read({}, updateTable);
    } else {
        alert('沒事別亂點');
    }
    
}
 function bumb () {

  var d = prompt('確定刪除全部?(y or n)');

  if ((d || '').toLowerCase() === 'y') {

    const $el = $('#bumb');

    // 保險：確保元素存在
    if ($el.length === 0) return;

    let s = 16; // 起始字體大小（px）

    const timer = setInterval(function () {
      $el.css('font-size', s + 'px');

      s += 2; // 👈 你原本寫兩次 s++，合併比較清楚

      if (s >= 700) {
        clearInterval(timer);

        //  動畫完成後才刪資料
        account.delete({});
        account.read({}, updateTable);

        //  再把字體大小重設回來
        
        $el.css('font-size', '16px');
      }
    }, 10);

  } else {
    alert('沒事別亂點');
  }
}