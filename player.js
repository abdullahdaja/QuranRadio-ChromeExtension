// popup.js

document.addEventListener('DOMContentLoaded', function () {
    const radioList = document.getElementById('radioList');
    const playButton = document.getElementById('play');
    const audioPlayer = document.getElementById('audioPlayer');
    const l1 = document.getElementById('l1');
    const l2 = document.getElementById('l2');
    const l3 = document.getElementById('l3');
    const l4 = document.getElementById('l4');
    const l5 = document.getElementById('l5');
    const l6 = document.getElementById('l6');
    const volumeControl = document.getElementById('volumeControl'); // Volume control element

    let isPlaying = false;
    let currentRadioUrl = '';

    function playRadio(url) {
        audioPlayer.src = url;
        audioPlayer.play();
        isPlaying = true;
        currentRadioUrl = url;
        chrome.storage.local.set({ currentRadioUrl, isPlaying });
        chrome.runtime.sendMessage({ action: "play", url: url });
    }

    function pauseRadio() {
        audioPlayer.pause();
        isPlaying = false;
        chrome.storage.local.set({ isPlaying });
        chrome.runtime.sendMessage({ action: "pause" });
    }

    // Function to adjust volume
    volumeControl.addEventListener('input', function () {
        audioPlayer.volume = volumeControl.value; // Set volume of audioPlayer
    });

    fetch('https://mp3quran.net/api/v3/radios?language=ar')
        .then(response => response.json())
        .then(data => {
            
            const radios = data.radios;
            console.log(radios);
            radios.forEach(radio => {
                const option = document.createElement('option');
                option.value = radio.url;
                option.textContent = radio.name;
                radioList.appendChild(option);

                switch (radio.id) {
                    case 108:
                        l1.innerHTML = radio.name;
                        l1.addEventListener('click', function () {
                            playRadio(radio.url);
                        });
                        break;
                    case 115:
                        l2.innerHTML = radio.name;
                        l2.addEventListener('click', function () {
                            playRadio(radio.url);
                        });
                        break;
                    case 123:
                        l3.innerHTML = radio.name;
                        l3.addEventListener('click', function () {
                            playRadio(radio.url);
                        });
                        break;
                    case 10902:
                        l4.innerHTML = radio.name;
                        l4.addEventListener('click', function () {
                            playRadio(radio.url);
                        });
                        break;
                    case 10906:
                        l5.innerHTML = radio.name;
                        l5.addEventListener('click', function () {
                            playRadio(radio.url);
                        });
                        break;
                    case 10907:
                        l6.innerHTML = radio.name;
                        l6.addEventListener('click', function () {
                            playRadio(radio.url);
                        });
                        break;
                    default:
                        break;
                }
            });
        })
        .catch(error => console.error('حدث خطأ:', error));

    chrome.storage.local.get(['currentRadioUrl', 'isPlaying'], function (result) {
        if (result.currentRadioUrl && result.isPlaying) {
            playRadio(result.currentRadioUrl);
        }
    });

    playButton.addEventListener('click', function () {
        if (isPlaying) {
            pauseRadio();
        } else {
            const selectedRadio = radioList.value;
            if (selectedRadio) {
                playRadio(selectedRadio);
            } else {
                alert('من فضلك اختر أذاعة');
            }
        }
    });
});
