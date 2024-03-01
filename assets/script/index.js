'use strict';

const operatingSystem = document.querySelector('.operating-system');
const language = document.querySelector('.language');
const browser = document.querySelector('.browser');
const width = document.querySelector('.width');
const height = document.querySelector('.height');
const screenOrientation = document.querySelector('.orientation');
const batteryLevel = document.querySelector('.battery-level');
const batteryStatus = document.querySelector('.battery-status');
const onlineStatus = document.querySelector('.online');

/*
    Functions
*/

//system

const getSystem = () => {
    getOperatingSystem();
    getLanguage();
    getBrowser();
}

const getOperatingSystem = () => {
    const osMap = {
        "Windows": "Windows",
        "Mac": "Mac OS",
        "Linux": "Linux",
        "Android": "Android",
        "iOS": "iOS"
    };
    
    let Opsystem = window.navigator.userAgent;
    let detectedOS = Object.keys(osMap).find(os => Opsystem.includes(os)) || 'Unknown';
    operatingSystem.innerText = `OS: ${osMap[detectedOS]}`;
} //got from chatGPT

const getLanguage = () => {
    language.innerText = `Language: ${navigator.language}`
}

function getBrowser() {
    const browserMap = {
        "Firefox": "Firefox",
        "Edg": "Edge",
        "Chrome": "Chrome",
        "Safari": "Safari",
        "Opera": "Opera",
        "OPR": "Opera"
    };

    let browserName = window.navigator.userAgent;
    let detectedBrowser = Object.keys(browserMap).find(browser => 
        browserName.includes(browser)) || 'Unknown';
    browser.innerText = `Browser: ${browserMap[detectedBrowser]}`;
} //got from chatGPT

//window

const getWindow = () => {
    width.innerText =`Width: ${window.innerWidth}px`;
    height.innerText =`Height: ${window.innerHeight}px`;

    if (window.innerHeight > window.innerWidth) {
        screenOrientation.innerText = 'Orientatioin: portrait';
    } else {
        screenOrientation.innerText = 'Orientatioin: landscape';
    }
}

//battery

const getBatteryInformation = () => {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            batteryLevel.innerText = `Battery level: ${(battery.level * 100).toFixed(0)}%`;
            batteryStatus.innerText = `Battery status: ${getBatteryStatus(battery)}`;
        })
    } else {
        batteryLevel.innerText = 'Battery level: not available';
        batteryStatus.innerText = 'Battery status: not available';
    }
}

const getBatteryStatus = battery => { 
    if (battery.charging) {
        return('Charging')
    } else {
        return('Idle')
    }
}

//network on/offline

const getOnlineStatus = () => {
    if (navigator.onLine) {
        onlineStatus.innerText = `Online`;
        onlineStatus.style.backgroundColor = '#37ab28';
    } else {
        onlineStatus.innerText = `Offline`;
        onlineStatus.style.backgroundColor = '#ff0202';
    }
}

/*
    updates
*/

//system

window.addEventListener('load', getSystem);

//window

window.addEventListener('load', getWindow);
window.addEventListener('resize', getWindow);

//battery

window.addEventListener('load', getBatteryInformation);
setInterval(getBatteryInformation, 10000);

//network on/offline

window.addEventListener('load', getOnlineStatus);
window.addEventListener('online', getOnlineStatus);
window.addEventListener('offline', getOnlineStatus);

