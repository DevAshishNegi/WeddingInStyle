let currentStoryNumber = 1;
let interval;
var typeIndex = 0;
const typeSpeed = 50;
const deleteSpeed = 40;
let headerBackground = 'rgba(0, 0, 0, {0})';
const storyTexts = [
    "And she said, Yes!",
    "Their dresses were made for each other, like them!",
    "In that moment they knew, they are making memory.",
    "Seven circles, seven vows!",
    "That was unique, the way they welcomed happy couple.",
    "When he held her hand, she felt love.",
    "The flavor of their wedding was reflecting in the food. Yummy!",
    "This's just for fun :-)",
];
const numSteps = 20.0;
let banner;

function init() {
    kickStories();
    headerAnimate();
    initSearchClick();
}

function kickStories() {
    setFirstActive();
    interval = setInterval(loadStory, 10000);
}

async function loadStory() {
    currentStoryNumber++;
    var storyImages = document.querySelectorAll('[data-storyImage]');
    var storyLines = document.querySelectorAll('[data-storyLine]');
    if (currentStoryNumber > storyImages.length) {
        currentStoryNumber = 1;
        for (i = 0; i < storyImages.length; i++) {
            storyImages[i].classList.remove('active');
            storyLines[i].classList.remove('story-done', 'story-active');
        }
    }
    for (i = 0; i < storyImages.length; i++) {
        storyImages[i].classList.remove('active');
        storyLines[i].classList.remove('story-active');
    }
    var currentStory = "[data-storyImage='" + currentStoryNumber + "']";
    document.querySelectorAll(currentStory)[0].classList.add("active");
    var currentStoryLine = "[data-storyLine='" + currentStoryNumber + "']";
    document.querySelectorAll(currentStoryLine)[0].classList.add("story-active");
    if (currentStoryNumber != 1) {
        var previousStory = "[data-storyLine='" + (currentStoryNumber - 1) + "']";
        document.querySelectorAll(previousStory)[0].classList.add("story-done");
    }

    await deleteStoryText();
    await typeStoryText(storyTexts[currentStoryNumber - 1]);
}

function setFirstActive() {
    document.querySelectorAll("[data-storyLine='1']")[0].classList.add('story-active');
    typeStoryText(storyTexts[0]);
}

async function typeStoryText(text) {
    document.getElementById("story-text").innerHTML = "";
    if (text && text.length > 0) {
        var speed = 3000 / text.length;
        for (var i = 0; i < text.length; i++) {
            document.getElementById("story-text").innerHTML += text.charAt(i);
            await sleep((speed < typeSpeed) ? speed : typeSpeed);
        }
    }
}

async function deleteStoryText() {
    var currentText = document.getElementById("story-text").innerHTML;
    if (currentText && currentText.length > 0) {
        if (currentText.length == 1) {
            document.getElementById("story-text").innerHTML = "";
        } else {
            var speed = 500 / currentText.length;
            for (var i = currentText.length - 2; i >= -1; i--) {
                if (i == -1) {
                    document.getElementById("story-text").innerHTML = "";
                } else {
                    document.getElementById("story-text").innerHTML = currentText.substring(0, i);
                }
                await sleep(speed);
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function headerAnimate() {
    banner = document.querySelectorAll(".home-banner")[0];
    createObserver();
}

function createObserver() {
    let observer;
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(banner);
}

function buildThresholdList() {
    let thresholds = [];
    let numSteps = 100;

    for (let i = 1.0; i <= numSteps; i++) {
        let ratio = i / numSteps;
        thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
}

function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
        let header = document.querySelectorAll(".header-container")[0];
        if (entry.intersectionRatio < 0.1) {
            document.getElementById("header").style.height = 51;
            document.getElementById("header").parentElement.style.height = 51;
            header.style.backgroundColor = headerBackground.format(0.80);
            header.classList.add('header-backblur');
        } else if (entry.intersectionRatio == 1) {
            document.getElementById("header").style.height = 81;
            document.getElementById("header").parentElement.style.height = 81;
            header.style.backgroundColor = headerBackground.format(0);
            header.classList.remove('header-backblur');
        } else {
            document.getElementById("header").style.height = (30 / 0.9) * (entry.intersectionRatio - 0.1) + 51;
            document.getElementById("header").parentElement.style.height = (30 / 0.9) * (entry.intersectionRatio - 0.1) + 51;
            const transparency = 0.80 - entry.intersectionRatio;
            document.querySelectorAll(".header-container")[0].style.backgroundColor = headerBackground.format(transparency < 0 ? 0 : transparency);
            header.classList.remove('header-backblur');
        }
    });
}

function initSearchClick() {
    document.querySelectorAll('.search-btn').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            window.location.href = "/search.html";
        });
    });
}

// window.onscroll = function() { scrollFunction() };
window.addEventListener("load", (event) => {
    init();
}, false);

String.prototype.format = function() {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
}