document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.querySelectorAll(".shafia_back-to-top");

    backToTop.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });

});
