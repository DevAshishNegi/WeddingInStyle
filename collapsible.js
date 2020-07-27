var elements = document.getElementsByClassName('collapsible');
Array.from(elements).forEach(element => {
    element.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('collapsible') && e.target.nextElementSibling) {
            e.target.nextElementSibling.classList.toggle("expand");
            e.target.querySelector('.flipper').classList.toggle('flip-it');
        } else {
            element = e.target.closest('.collapsible');
            element.nextElementSibling.classList.toggle("expand");
            element.querySelector('.flipper').classList.toggle('flip-it');
        }
    });
});