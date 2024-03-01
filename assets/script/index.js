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
    let Opsystem = window.navigator.userAgent;

    if (Opsystem.includes("Windows")) {
        operatingSystem.innerText = 'OS: Windows'
    } else if (Opsystem.includes("Mac")) {
        operatingSystem.innerText = 'OS: Mac OS'
    } else if (Opsystem.includes("Linux")) {
        operatingSystem.innerText = 'OS: Linux'
    }else if (Opsystem.includes("Android")) {
        operatingSystem.innerText = 'OS: Android'
    } else if (Opsystem.includes("iOS")) {
        operatingSystem.innerText = 'OS: iOS'
    } else {
        operatingSystem.innerText = 'Unknown'
    }
}

const getLanguage = () => {
    language.innerText = `Language: ${navigator.language}`
}

function getBrowser() {
    let browserName = window.navigator.userAgent;

    if (browserName.includes("Firefox")) {
        browser.innerText = "Firefox";
    } else if (browserName.includes("Edg")) {
        browser.innerText = "Edge";
    } else if (browserName.includes("Chrome")) {
        browser.innerText = "Chrome";
    } else if (browserName.includes("Safari")) {
        browser.innerText = "Safari";
    } else if (browserName.includes("Opera") || browserName.includes("OPR")) {
        browser.innerText = "Opera";
    } else {
        browser.innerText = "Unknown"
    }
}

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

