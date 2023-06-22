$(document).ready(function () {
    /* Functionality to Go to top page when the user have scrolled more than 20px. 
        If the user is at the top section itself, hide the icon to go to top.
    */
    let goToTop = $(".goToTop")[0];
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $(goToTop).css("display", "block");
        } else {
            $(goToTop).css("display", "none");
        }
    }

    //animate to the top section of the page slowly
    $(goToTop).click(() => {
        $("html,body").animate({ scrollTop: 0 }, "slow");
    });
});