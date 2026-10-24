var score = DB.table('score');

var toggleCh = -1; //國文排序方式
var toggleEn = -1; //英文排序方式
var toggleMath = -1; //數學排序方式
var toggleSum = -1; //總分排序方式

$('#create').click(createScore); //點擊「新增成績」時執行 createScore 指令
$('tbody').on('click', '.delete', deleteScore); //點擊「刪除」時執行 deleteScore 指令

$('#orderByCh').click(orderByCh); //點擊「國文」標題時執行 orderByCh 指令
$('#orderByEn').click(orderByEn); //點擊「英文」標題時執行 orderByCh 指令
$('#orderByMath').click(orderByMath); //點擊「數學」標題時執行 orderByCh 指令
$('#orderBySum').click(orderBySum); //點擊「總分」標題時執行 orderByCh 指令


score.read({}, renderTable);



// 新增一位學生的成績資料
function createScore() {
    var nam = prompt('請輸入姓名');
    var ch = Number(prompt('請輸入國文成績'));
    var en = Number(prompt('請輸入英文成績'));
    var math = Number(prompt('請輸入數學成績'));
    var sum = (ch + en + math);




    //alert (sum);
    score.create({
        na : nam,
        c : ch,
        e : en,
        ma : math,
        su : sum,
    });
    score.read({}, renderTable);
}

// 將資料庫查詢的資料 data 從新寫入畫面表格
function renderTable(data) {
    $('tbody').empty();
    //for (let i = 0; i < data.length; i++) {
    //    const row = data[i];
        
    //    const t = `
    //        <tr>
                
    //            <td>${row.na}</td>
    //            <td>${row.c}</td>
    //            <td>${row.e}</td>
    //            <td>${row.ma}</td>
    //            <td>${row.su}</td>
    //            <td class="delete" data-id="${row.id}">刪除</td>
    //        </tr>
    //    `;
    //    $('tbody').append(t);
    //    console.log(data);
    //}
    data.forEach(function(d){
        const t = `
            <tr>
                
                <td>${d.na}</td>
                <td>${d.c}</td>
                <td>${d.e}</td>
                <td>${d.ma}</td>
                <td>${d.su}</td>
                <td class="delete" data-id="${d.id}">刪除</td>
            </tr>
        `;
        $('tbody').append(t);
    });
}

// 移除一筆學生成績資料
function deleteScore () {
    let id = $(this).data('id');
    score.delete({id:id});
    score.read({}, renderTable);
}

// 根據國語成績進行排序
function orderByCh() {

}

// 根據英文成績進行排序
function orderByEn() {

}

// 根據數學成績進行排序
function orderByMath() {

}

// 根據總成績進行排序
function orderBySum() {

}
