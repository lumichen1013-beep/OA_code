// noprotect
// 1. 專案載入後執行一次查詢所有資料並顯示

pokemons.read({}, renderTable);
// 2. 將資料庫查詢的資料 data 更新到網頁的表格
function renderTable (data) {
    $('tbody').empty();
    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                <td>${data[i].index}</td>
                <td><div class="icon icon-${data[i].index}"></div></td>
                <td>${data[i].name}</td>
                <td>${data[i].height}kg</td>
                <td>${data[i].weight}m</td>
                <td>${data[i].attr}</td>
            </tr>`;
    $('tbody').append(row);
    }
}

// 3. 查詢所有資料
$('#read_all').click(function () {
    pokemons.read({}, renderTable);
});

// 3. 依據使用者所輸入的寶可夢「編號」查詢
$('#read_by_index').click(function () {
    var idx = prompt('編號?');
    pokemons.read({index: idx}, renderTable);
});

// 3. 依據使用者所輸入的寶可夢「名字」查詢
$('#read_by_name').click(function () {
    var namex = prompt('名字?');
    pokemons.read({name: namex}, renderTable);
});

// 3. 依據使用者所輸入的寶可夢「屬性」查詢
$('#read_by_attr').click(function () {
    var attrx = prompt('屬性？');
    pokemons.read({attr: attrx}, renderTable);
});

// 4. 查詢所有資料並依據「體重」小到大排序
$('#order_by_weight_asc').click(function(){
    pokemons.read({}, {
        $orderBy: {
            weight:1
        }
    }, renderTable);
});

// 4. 查詢所有資料並依據「體重」大到小排序
$('#order_by_weight_desc').click(function () {
    pokemons.read({}, {
        $orderBy: {
            weight:-1
        }
    }, renderTable);
});

// 4. 查詢所有資料並依據「身高」小到大排序
$('#order_by_height_asc').click(function () {
    pokemons.read({}, {
        $orderBy: {
            height:1
        }
    }, renderTable);
});

// 4. 查詢所有資料並依據「身高」大到小排序
$('#order_by_height_desc').click(function () {
    pokemons.read({}, {
        $orderBy: {
            height:-1
        }
    }, renderTable);
});


// ------------------------------------

// 5. 使用者新增一筆資料
$('#create').click(function () {
    var index = prompt('編號?');
    var name = prompt('名稱?');
    var weight = prompt('體重?');
    var height = prompt('身高?');
    var attr = prompt('屬性?');
    
    pokemons.create({
        index: index,
        name: name,
        weight: weight,
        height: height,
        attr: attr,
    });
    pokemons.create({}, renderTable);
    
});


// 6. 刪除使用者輸入編號的資料
$('#delete').click(function () {
    var namex = prompt('要刪除的寶可夢名字?');
    pokemons.delete({name: namex});
    pokemons.read({}, renderTable);
});