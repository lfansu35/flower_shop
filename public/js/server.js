
$(function () {
    var img = ["bg1.jpeg", "bg2.jpeg", "bg4.jpeg"];

    var c = 0;
    $(".background").css("background-image", "url(" + img[c] + ")");
    setInterval(function () {
        c++;
        if (c == img.length) {
            c = 0;
        }
        $(".background").fadeOut(1, function () {
            $(this).css("background-image", "url(" + img[c] + ")");
            $(this).fadeIn(1);
        });
    }, 2000);

});

