// popup.js

document.addEventListener('DOMContentLoaded', function () {
    const openPlayerButton = document.getElementById('openPlayerButton');

    openPlayerButton.addEventListener('click', function () {
        chrome.tabs.create({ url: chrome.runtime.getURL('player.html') });
    });
});
