var elements = document.getElementsByClassName('f-s-modal');

Array.from(elements).forEach(element => {
    element.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('f-s-modal')) {
            handle(e.target);
        } else if (e.target && e.target.parentElement.classList.contains('f-s-modal')) {
            handle(e.target.parentElement);
        }
    });
});

function handle(element) {
    const contentId = element.dataset.contentid;
    if (contentId) {
        var elContent = document.querySelectorAll('#' + contentId);
        if (elContent) {
            const content = elContent[0].innerHTML;
            var body = document.querySelector("body");
            var modal = document.createElement("div");
            // modal.appendChild(element.cloneNode(true));
            modal.innerHTML = '<button class="f-s-m-close"><span class="material-icons">close</span></button>' + content;
            modal.id = 'f-s-modal-content';
            modal.classList.add('modal-initial');
            var rect = element.getBoundingClientRect();
            modal.style.top = rect.top;
            modal.style.left = rect.left;
            modal.style.height = element.offsetHeight;
            modal.style.width = element.offsetWidth;

            Array.from(modal.children).forEach(child => {
                child.style.padding = 0;
                child.style.margin = 0;
            });
            body.appendChild(modal);
            setTimeout(function() {
                document.querySelector('#f-s-modal-content').classList.toggle('modal-container');
                disableScroll();
            }, 50);
            // modalInital.innerHTML = '<button class="f-s-m-close"><span class="material-icons">close</span></button>' + content;
            // modalInital.style.top = 0;
            // modalInital.style.left = 0;
            // modalInital.classList.add('modal-container');
            // disableScroll();
        }
    }
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('f-s-m-close') || e.target.parentElement.classList.contains('f-s-m-close')) {
        closeModal();
    }
});

function closeModal() {
    var el = document.querySelector('#f-s-modal-content');
    if (el) {
        el.classList.toggle('modal-container');
        setTimeout(function() { document.querySelector('#f-s-modal-content').remove(); }, 250);
    }
    enableScroll();
}

function disableScroll() {
    // // Get the current page scroll position 
    // scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

    //     // if any scroll is attempted, set this to the previous value 
    //     window.onscroll = function() {
    //         window.scrollTo(scrollLeft, scrollTop);
    //     };
    var body = document.querySelector("body");
    body.classList.toggle('screen-height');
}

function enableScroll() {
    // window.onscroll = function() {};
    var body = document.querySelector("body");
    body.classList.toggle('screen-height');
}
//menu modal
var elMenuBtn = document.querySelector('.btn-menu');
elMenuBtn.addEventListener('click', function(e) {
    var elMenuContent = document.querySelector('.header-container');
    elMenuContent.classList.toggle('expand-f-s-menu');
    elMenuContent.querySelector('.flipper').classList.toggle('flip-it');
    elMenuContent.querySelector('.f-s-header-full').classList.toggle('none');
    document.querySelector("body").classList.toggle('screen-height');
});