$('#shake') .hide();

$('button') .click(function(){
    
    var content = $('#tx').val();
    console.log(content);
    var co = content.split('\n');
    var c = Math.floor(Math.random()*co.length);
    $('img') .hide();
    $('#shake') .show();
    $('h1') .text("result is ..."+co[c]);
});