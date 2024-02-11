
document.addEventListener("DOMContentLoaded", () => {


    document.querySelector("title").textContent = document.querySelector('html').dataset.title ? document.querySelector('html').dataset.title  : "test";

});