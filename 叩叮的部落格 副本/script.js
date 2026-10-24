var display = false;
$('#button').click(showMessage);
function showMessage () {
    if(display == false){
        $('.secret').fadeIn();
        display = true;
    } else{
        $('.secret').fadeOut();
        display = false;
        
    }
}