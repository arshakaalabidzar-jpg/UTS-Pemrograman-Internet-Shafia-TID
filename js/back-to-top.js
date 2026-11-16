document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".shafia_back-to-top");

    buttons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector("#shafia_header").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});
