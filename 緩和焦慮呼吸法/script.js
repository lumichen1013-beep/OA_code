$('button').click(breath);

let start = Date.now()

function breath(){
    start = Date.now()
}

function loop(){
    let now = Date.now() - start
    console.log(now)
    if(now <= 4000){
        $('h1').text('吸氣');
        $('body').css('background-color', 'green');
    }else if(now <= 13000){
        $('h1').text('bee tsee');
        $('body').css('background-color', 'red');
    }else if(now <= 21000){
        $('h1').text('too tsee');
        $('body').css('background-color', 'white');
    }else if(now <= 4000 +21000){
        $('h1').text('吸氣');
        $('body').css('background-color', 'green');
    }else if(now <= 13000 + 21000){
        $('h1').text('bee tsee');
        $('body').css('background-color', 'red');
    }else if(now <= 21000 + 21000){
        $('h1').text('too tsee');
        $('body').css('background-color', 'white');
    }else if(now <= 4000 +42000){
        $('h1').text('吸氣');
        $('body').css('background-color', 'green');
    }else if(now <= 13000 + 42000){
        $('h1').text('bee tsee');
        $('body').css('background-color', 'red');
    }else if(now <= 21000 + 42000){
        $('h1').text('too tsee');
        $('body').css('background-color', 'white');
    }else if(now <= 4000 +63000){
        $('h1').text('吸氣');
        $('body').css('background-color', 'green');
    }else if(now <= 13000 + 63000){
        $('h1').text('bee tsee');
        $('body').css('background-color', 'red');
    }else if(now <= 21000 + 63000){
        $('h1').text('too tsee');
        $('body').css('background-color', 'white');
    }else{
        $('h1').text('tsia sue');
        $('body').css('background-color', 'yellow');
    }
}

setInterval(loop)
