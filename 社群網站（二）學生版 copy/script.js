var post = DB.table('post'); //文章的資料表
var comment = DB.table('comment'); //留言的資料表
var userName = USER_NAME;
var postId;

$('.js-show-form-page').click(showFormPage); //「發文」按鈕點擊時，切換表單頁面
$('.js-show-post-list').click(showHomePage); //「取消」按鈕點擊時，切換文章列表頁面
$('#home-page').on('click', '.post-item', showPostPage); //「取消」按鈕點擊時，切換文章列表頁面

// 切換「文章檢視」頁面
function showPostPage () {
    $('#home-page').hide();
    $('#post-page').show();
    $('#form-page').hide();
    
    postId = $(this).data('id');
    
    post.read({id:postId},updatePost);
    updateComment();
    
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

post.read({}, updatePostList); //執行專案時預先更新首頁文章列表

// 新增文章到資料表
function createPost () {
    var typeVal = $('#form-type').val();
    var titleVal = $('#form-title').val();
    var contentVal = $('#form-content').val();

    if (typeVal !== '' && titleVal !== '' && contentVal.length > 20) {

        $('#form-type').val(''); //清空
        $('#form-title').val(''); //清空
        $('#form-content').val(''); //清空

        post.create({
            type: typeVal,
            title: titleVal,
            content: contentVal,
            author: userName,
            date: new Date(),
        }, console.log);
        showHomePage();
        post.read({}, updatePostList);
    } else {
        alert('請確認文章類型、標題皆有填寫，且文章內容不得低於 20 字！');
    }
}

// 更新首頁的文章列表
function updatePostList (data) {
    $('#post-list').empty();
    data.forEach(function (d) {
        var type_class = typeToClass(d.type);
        var html = `
        <div class="post-item card " data-id="${d.id}">
            <h3><span class="tag bg-warning ${type_class}">${d.type}</span>${d.title}</h3>
            <p>${d.content.slice(0, 90)}...</p>
            <span class="gray">${d.date.slice(0, 10)}</span>
        </div>
        `;
        $('#post-list').append(html);
    });

    if (data.length > 0) {
        $('#bottom-text').text('底部');
    } else {
        $('#bottom-text').text('無相關文章');
    }
}

// 顯示特定類型的文章
function filter () {
    var typeVal = $(this).data('type');
    if (typeVal == '全部') {
        post.read({}, updatePostList);
    } else {
        post.read({type: typeVal}, updatePostList);
    }
}

// 顯示指定文章
function updatePost (data) {
    $('#post-type').text(data[0].type);
    $('#post-title').text(data[0].title);
    $('#post-author').text(data[0].author);
    $('#post-date').text(data[0].date.slice(0,10));
    $('#post-content').text(data[0].content);
    comment.read({postId:postId},updateComment);
    
    $('#post-type').removeClass();
    $('#post-type').addClass('tag');
    $('#post-type').addClass(typeToClass(data[0].type));
}

// 新增文章
function createComment () {
    
    var t = $('#comment-input').val();
    
    
    comment.create({
        content: t,
        author: userName,
        date: new Date(),
        postId:postId
    },console.log);
    $('#comment-input').val(' ');
    
    comment.read({postId:postId},updateComment);
    
}

// 更新留言
function updateComment (data) {
    $('#comment-length').text(data.length + '則留言');
    $('#comment-list').empty();
    
    
    data.forEach(function (d) {
        
        var html = `
        <div class="comment-item card">
            <strong>${d.author}</strong>
            <span>${d.content}</span>
            <span class="float-right gray">${d.date.slice(0,10)}</span>
        </div>
        `;
        $('#comment-list').append(html);
    });
}

// 根據文章類型對應顏色的標籤
function typeToClass (type) {
    if (type == '新聞') {
        return 'bg-blue';
    } else if (type == '新聞') {
        return 'bg-blue';
    } else if (type == '愛情') {
        return 'bg-red';
    } else if (type == '八卦') {
        return 'bg-purple';
    } else if (type == '購物') {
        return 'bg-orange';
    } else if (type == '笑話') {
        return 'bg-yellow';
    } else if (type == '閒聊') {
        return 'bg-gray';
    }
}