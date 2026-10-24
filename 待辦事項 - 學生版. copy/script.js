var task = DB.table('task'); // task 資料表存放事項資料
task.read({}, updateList); // 查詢所有資料並更新至畫面

$('#create').click(create); //「新增」被點擊時執行 create 指令
$('#deleteAll').click(deleteAll); //「移除全部」被點擊時執行 deleteAll 指令
$('.delete').click(deleteTask); //「刪除」被點擊時執行 deleteTask 指令
$('.update').click(updateTask); //「修改」被點擊時執行 updateTask 指令


// 新增一筆資料至資料庫
function create () {

}

// 將查詢的資料新增到介面列表上
function updateList (data) {

}

// 刪除全部事項
function deleteAll () {

}

// 刪除指定事項
function deleteTask () {

}

// 更新指定事項
function updateTask () {

}