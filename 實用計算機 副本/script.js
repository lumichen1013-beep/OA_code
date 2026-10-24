$('button').click(getChar);


function getChar(){
    var char = $(this).text();
    //console.log(char);
    var screen_text = $('p').text();
    if (char == 'C') {
        screen_text = ' ';
    } else if (char == 'del') {
        screen_text = screen_text.slice(0,screen_text.length-1);
    } else if (char == '=') {
        screen_text = eval(screen_text)
    } else {
        screen_text += char;
    }
    
    $('p').text(screen_text);
}