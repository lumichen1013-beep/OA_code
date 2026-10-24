var post = DB.table('post'); //文章的資料表
var comment = DB.table('comment'); //留言的資料表
var userName = USER_NAME;
var postId;
var tt = 0;

$('.js-show-form-page').click(showFormPage); //「發文」按鈕點擊時，切換表單頁面
$('.js-show-post-list').click(showHomePage); //「取消」按鈕點擊時，切換文章列表頁面
$('#home-page').on('click', '.post-item', showPostPage); //「取消」按鈕點擊時，切換文章列表頁面
$('.js-filter').click(filter);

post.read({}, updatePostList);

// 切換「文章檢視」頁面
function showPostPage () {
    $('#home-page').hide();
    $('#post-page').show();
    $('#form-page').hide();
}

// 切換「文章新增」頁面
function showFormPage () {
    $('#home-page').hide();
    $('#post-page').hide();
    $('#form-page').show();
}

// 切換「文章列表」頁面
function showHomePage () {
    $('#home-page').show();
    $('#post-page').hide();
    $('#form-page').hide();
}

$('.js-create-post').click(createPost); //「送出」按鈕點擊
$('.js-filter').click(filter); //「分類」按鈕點擊
$('.js-create-comment').click(createComment); // 新增留言


// 新增文章到資料表
function createPost () {
    var typeVal = $('#form-type').val();
    var titleVal = $('#form-title').val();
    var contentVal = $('#form-content').val();
    $('#form-type').val('');
    $('#form-title').val('');
    $('#form-content').val('');
    
    console.log(contentVal)
    
    if(typeVal.length > 1 && titleVal.length > 1 && contentVal.length > 19) {
        post.create({
            type:typeVal,
            title:titleVal,
            count:contentVal,
            author:userName,
            date:new Date(),
        });
    } else {
        alert('字數不足');
    }
        
}

// 更新首頁的文章列表
function updatePostList (data) {
    tt = 0;
    $('#post-list').empty();
    data.forEach(function(d){
        var row =`
            <div class="post-item card" data-id="123">
                <h3><span class="tag bg-orange">${d.type}</span>${d.title}</h3>
                <p>${d.count}</p>
                <span class="gray">${d.date}</span>
            </div>
        `;
        $('#post-list').append(row);
        tt++;
    });
    if (tt == 0) {
        $('#bottom-text').text('—無相關文章—');
    } else {
        $('#bottom-text').text('—底部—');
    }
}

// 顯示特定類型的文章
function filter () {
    var typeVal = $(this).data('type');
    if (typeVal == '全部') {
        post.read({}, updatePostList);
    } else {
        post.read({type:typeVal},updatePostList);
    }
}

// 顯示指定文章
function updatePost (data) {

}

// 新增文章
function createComment () {

}

// 更新留言
function updateComment (data) {

}

// 根據文章類型對應顏色的標籤
function typeToClass (type) {

}