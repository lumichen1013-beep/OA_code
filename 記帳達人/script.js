// ========================================================
// 手機端本機 SQLite 資料庫引擎 (純前端無依賴，支援離線與即時儲存)
// ========================================================
class MobileSQLiteDB {
    constructor() {
        this.storageKey = 'mobile_accounting_sqlite_records';
        const rawData = localStorage.getItem(this.storageKey);

        if (rawData === null) {
            // 只有在「初次造訪」（從未建立過資料庫）時才載入預設項目
            this.records = [];
            this.nextId = 1;
            this.initDefaultRecords();
        } else {
            // 使用者已經使用過，即使資料已清空為 0 筆，也不再重新注入預設資料
            try {
                this.records = JSON.parse(rawData) || [];
            } catch (e) {
                this.records = [];
            }
            this.nextId = this.records.length > 0
                ? Math.max(...this.records.map(r => Number(r.id) || 0)) + 1
                : 1;
        }
    }

    // 儲存資料到手機端 localStorage
    saveRecords() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.records));
        } catch (e) {
            console.error('儲存本機資料失敗:', e);
        }
    }

    // 預設資料
    initDefaultRecords() {
        const defaults = [
            { type: '食物', date: '2026-10-24', cost: 65, note: '早餐' },
            { type: '交通', date: '2026-10-24', cost: 20, note: '捷運' },
            { type: '食物', date: '2026-10-24', cost: 80, note: '午餐' },
            { type: '食物', date: '2026-10-24', cost: 110, note: '晚餐' },
            { type: '生活', date: '2026-10-24', cost: 50, note: '文具' }
        ];
        defaults.forEach(item => {
            this.records.push({
                id: String(this.nextId++),
                type: item.type,
                date: item.date,
                cost: Number(item.cost),
                note: item.note
            });
        });
        this.saveRecords();
    }

    // 模擬 DB.table 物件 API
    table(tableName) {
        const self = this;
        return {
            // 新增 (SQL: INSERT INTO accounts ...)
            create: function (item) {
                const record = {
                    id: String(self.nextId++),
                    type: item.type,
                    date: item.date,
                    cost: Number(item.cost),
                    note: item.note || ''
                };
                self.records.push(record);
                self.saveRecords();
                return record;
            },

            // 查詢 (SQL: SELECT * FROM accounts WHERE ... ORDER BY date DESC, id DESC)
            read: function (query, callback) {
                let results = [...self.records];

                // 條件篩選 (例如 { type: '食物' })
                if (query && typeof query === 'object') {
                    Object.keys(query).forEach(key => {
                        if (query[key] !== undefined && query[key] !== '') {
                            results = results.filter(r => r[key] === query[key]);
                        }
                    });
                }

                // 排序：日期由新到舊
                results.sort((a, b) => {
                    if (b.date !== a.date) return b.date > a.date ? 1 : -1;
                    return Number(b.id) - Number(a.id);
                });

                if (typeof callback === 'function') {
                    callback(results);
                }
                return results;
            },

            // 刪除 (SQL: DELETE FROM accounts WHERE id = ? 或全部刪除)
            delete: function (query) {
                if (query && query.id !== undefined) {
                    self.records = self.records.filter(r => String(r.id) !== String(query.id));
                } else {
                    // 若無指定 id 則清空全部
                    self.records = [];
                    self.nextId = 1;
                }
                self.saveRecords();
            }
        };
    }
}

// 實例化資料庫
var DB = new MobileSQLiteDB();
var account = DB.table('account');

// 當前分類篩選狀態
var currentCategory = null;

// ========================================================
// 頁面初始化與事件綁定
// ========================================================
$(document).ready(function () {
    // 日期預設為今天
    var today = new Date().toISOString().split('T')[0];
    $('#date').val(today);

    // 點擊「新增」新增一筆資料
    $('#create').click(create);

    // 點擊「圖示」篩選資料
    $('.filter').click(filter);

    // 點擊「炸彈」清空所有資料
    $('#bumb').click(bumb);

    // 預設查詢所有資料並更新至表格
    account.read({}, updateTable);
});

// 新增一筆記帳紀錄到資料表並更新畫面
function create() {
    var type = $('#type').val();
    var date = $('#date').val();
    var cost = $('#cost').val();
    var note = $('#note').val();

    if (date == '') {
        alert('日期忘記填了喔');
        $('#date').focus();
        return;
    }
    if (cost == '' || Number(cost) <= 0) {
        alert('價錢忘記填了喔 (請輸入大於0的金額)');
        $('#cost').focus();
        return;
    }

    // 寫入手機端資料庫
    account.create({
        type: type,
        date: date,
        cost: cost,
        note: note
    });

    // 清空輸入欄位
    $('#cost').val('');
    $('#note').val('');

    // 重新依當前篩選狀態查詢並更新畫面
    var query = currentCategory ? { type: currentCategory } : {};
    account.read(query, updateTable);
}

// 將查詢的記帳紀錄 data 更新至畫面上
function updateTable(data) {
    var total = 0;
    $('tbody').empty();

    if (!data || data.length === 0) {
        $('tbody').append('<tr><td colspan="6" style="padding: 20px; color: #777;">目前沒有任何記帳資料</td></tr>');
        $('#sum').text(0);
        return;
    }

    data.forEach(function (item) {
        var i = Number(item.cost) || 0;
        var row = `
        <tr data-id="${item.id}">
            <td>${typeToEmoji(item.type)}</td>
            <td>${item.type}</td>
            <td>${item.date}</td>
            <td>${item.cost}元</td>
            <td>${item.note || ''}</td>
            <td><button class="del-btn" onclick="deleteScore('${item.id}')">刪除</button></td>
        </tr>
        `;
        total += i;
        $('tbody').append(row);
    });

    $('#sum').text(total);
}

// 將類型的字串轉換成 emoji 符號
function typeToEmoji(type) {
    if (type == '食物') {
        return '🍖';
    } else if (type == '生活') {
        return '🏠';
    } else if (type == '交通') {
        return '🚌';
    } else if (type == '衣服') {
        return '👕';
    } else if (type == '學習') {
        return '📖';
    } else if (type == '娛樂') {
        return '🎮';
    }
    return '📌';
}

// 依據類型查詢所有資料並更新至表格（點擊可切換過濾／取消過濾）
function filter() {
    var selectedType = $(this).data('type');

    if (currentCategory === selectedType) {
        // 再次點擊相同類別，取消篩選顯示全部
        currentCategory = null;
        $('.icon').removeClass('active');
        account.read({}, updateTable);
    } else {
        // 設定篩選類別
        currentCategory = selectedType;
        $('.icon').removeClass('active');
        $(this).addClass('active');
        account.read({ type: selectedType }, updateTable);
    }
}

// ========================================================
// 現代觸控確認視窗 (完全取代 prompt / confirm，不被瀏覽器封鎖)
// ========================================================
function showConfirm(message, onConfirm, onCancel) {
    $('#modal-msg').text(message);
    $('#confirm-modal').fadeIn(120);

    // 綁定「確定」按鈕
    $('#modal-ok').off('click').on('click', function () {
        $('#confirm-modal').fadeOut(120);
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    });

    // 綁定「取消」按鈕
    $('#modal-cancel').off('click').on('click', function () {
        $('#confirm-modal').fadeOut(120);
        if (typeof onCancel === 'function') {
            onCancel();
        }
    });
}

// 刪除單筆紀錄
function deleteScore(id) {
    showConfirm(
        '是否確定要刪除這筆紀錄？',
        function () {
            account.delete({ id: id });
            var query = currentCategory ? { type: currentCategory } : {};
            account.read(query, updateTable);
        },
        function () {
            alert('沒事別亂點');
        }
    );
}
window.deleteScore = deleteScore;

// 炸彈清空全部（保留原始放大動畫彩蛋，固定在螢幕正中央）
function bumb() {
    showConfirm(
        '⚠️ 是否確定要清空全部記帳紀錄？',
        function () {
            const $el = $('#bumb');
            if ($el.length === 0) return;

            let s = 24; // 起始字體大小（px）
            $el.css({
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                width: 'auto',
                height: 'auto',
                lineHeight: '1',
                margin: '0',
                textAlign: 'center',
                pointerEvents: 'none'
            });

            const timer = setInterval(function () {
                $el.css('font-size', s + 'px');
                s += 8;

                if (s >= 400) {
                    clearInterval(timer);

                    // 動畫完成後清空資料庫
                    account.delete({});
                    currentCategory = null;
                    $('.icon').removeClass('active');
                    account.read({}, updateTable);

                    // 移除行內樣式，還原炸彈原本位置
                    $el.removeAttr('style');
                }
            }, 12);
        },
        function () {
            alert('沒事別亂點');
        }
    );
}