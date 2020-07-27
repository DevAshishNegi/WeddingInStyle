let searchBar;

function init() {
    initMiniHeader();
    initFilterClick();
    initFilterItemClick();
}

function initMiniHeader() {
    searchBarTop = document.querySelectorAll(".so-bar-top-offset")[0];
    searchBar = document.querySelectorAll(".search-options-bar")[0];
    searchDescription = document.querySelectorAll(".search-description")[0];
    searchButton = document.querySelectorAll('.btn-so-search')[0];
    createSearchBarObserver();
}

function createSearchBarObserver() {
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    };
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio != 1) {
                searchDescription.classList.add("search-description-small");
                searchButton.classList.add('fancy-show');
            } else {
                searchDescription.classList.remove("search-description-small");
                searchButton.classList.remove('fancy-show');
            }
        });
    }, options);
    observer.observe(searchBarTop);
}

function initFilterClick() {
    document.querySelectorAll('.btn-filter').forEach((btn) => {
        btn.addEventListener('click', event => {
            document.querySelectorAll('.filters')[0].classList.toggle('minimize-filter');
        });
    });
}

function initFilterItemClick() {
    document.querySelectorAll('.fl-item-lnk-cover').forEach(btn => {
        btn.addEventListener('click', event => {
            event.stopPropagation();
            event.preventDefault();
            event.target.parentElement.classList.toggle('unchecked');
        });
    });
}
window.addEventListener("load", (event) => {
    init();
}, false);