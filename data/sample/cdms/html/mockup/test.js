
document.addEventListener("DOMContentLoaded", () => {
    console.log('same11 - ')

    document.querySelector("title").textContent = document.querySelector('html').dataset.title ? document.querySelector('html').dataset.title  : "확인";


});