$(document).ready(function() {
    $(function() {
        $("#includedMenu").load("/menu.html");
    });
})


//MouseEvent offsetX/offsetY : returns the x/y coordinate of the mouse pointer, relative to the target element
function zoom(e) {
    let zoomer = e.currentTarget;
    if (e.offsetX) {
        offsetX = e.offsetX
    } else if (e.touches[0]) {
        offsetX = e.touches[0].pageX
    }

    if (e.offsetY) {
        offsetY = e.offsetY
    } else if (e.touches[0]) {
        offsetY = e.touches[0].pageY
    }

    x = offsetX / zoomer.offsetWidth * 100
    y = offsetY / zoomer.offsetHeight * 100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}