const elTimeTable = document.querySelector(".time-table");
const elTimeTemplate = document.querySelector(".time-template").content;
const elBox = document.querySelector(".box-btn");
const elSelectTime = document.querySelector(".select-time");
const elSelectRegion = document.querySelector(".select-region");
const elTimeTitle = document.querySelector(".time-title");

elTimeTitle.textContent = `Siz tanlagan shahar, ${elSelectRegion.value}`;
const timeFragment = document.createDocumentFragment();



function renderTime(arr, table) {
    table.innerHTML =
        `
    <tr>
        <th>Kun</th>
        <th>Hafta kuni</th>
        <th>Tong</th>
        <th>Quyosh</th>
        <th>Peshin</th>
        <th>Asr</th>
        <th>Shom</th>
        <th>Hufton</th>
    </tr>
    `



    let arr1 = new Array();
    if (!Array.isArray(arr)) {
        arr1.push(arr);

    } else {
        arr1 = arr;
    }

    for (let i = 0; i < arr1.length; i++) {
        const timeFragmentClone = elTimeTemplate.cloneNode(true);
        if (arr1.length == 1) {
            timeFragmentClone.querySelector(".time-day").textContent = arr1[i].date.split("-").at(2);

            const fajr = document.querySelector(".fajr");
            const sunrise = document.querySelector(".sunrise");
            const dhuhr = document.querySelector(".dhuhr");
            const asr = document.querySelector(".asr");
            const maghrib = document.querySelector(".maghrib");
            const isha = document.querySelector(".isha");
            fajr.textContent = arr1[i].times.tong_saharlik;
            sunrise.textContent = arr1[i].times.quyosh;
            dhuhr.textContent = arr1[i].times.peshin;
            asr.textContent = arr1[i].times.asr;
            maghrib.textContent = arr1[i].times.shom_iftor;
            isha.textContent = arr1[i].times.hufton;
        }
        else if (arr1.length == 7) {
            timeFragmentClone.querySelector(".time-day").textContent = arr1[i].date.split("/", 1);
        }
        else {
            timeFragmentClone.querySelector(".time-day").textContent = arr1[i].date.split("T", 1);
        }
        timeFragmentClone.querySelector(".time-weekday").textContent = arr1[i].weekday;
        if (arr1[i].weekday == "Juma") {
            timeFragmentClone.querySelector(".time-tr").style.backgroundColor = "#00B533";
            timeFragmentClone.querySelector(".time-tr").style.color = "#fff";
        }

        timeFragmentClone.querySelector(".time-fajr").textContent = arr1[i].times.tong_saharlik;
        timeFragmentClone.querySelector(".time-sunrise").textContent = arr1[i].times.quyosh;
        timeFragmentClone.querySelector(".time-dhuhr").textContent = arr1[i].times.peshin;
        timeFragmentClone.querySelector(".time-asr").textContent = arr1[i].times.asr;
        timeFragmentClone.querySelector(".time-maghrib").textContent = arr1[i].times.shom_iftor;
        timeFragmentClone.querySelector(".time-isha").textContent = arr1[i].times.hufton;
        timeFragment.appendChild(timeFragmentClone);
    }
    table.appendChild(timeFragment);
}

async function getAllCalendar(time) {
    try {
        const openData = await (await fetch(time)).json();
        renderTime(openData, elTimeTable);
    } catch (error) {
        console.log(error);
    }
}

getAllCalendar("https://islomapi.uz/api/present/day?region=Toshkent");

elBox.addEventListener("click", evt => {
    if (evt.target.matches(".select-region")) {
        if (elSelectTime.value == "day") {
            getAllCalendar(`https://islomapi.uz/api/present/day?region=${elSelectRegion.value}`);
        }
        if (elSelectTime.value == "week") {
            getAllCalendar(`https://islomapi.uz/api/present/week?region=${elSelectRegion.value}`);
        }
        if (elSelectTime.value == "month") {
            getAllCalendar(`https://islomapi.uz/api/monthly?region=${elSelectRegion.value}&month=4`);
        }
    };
    if (evt.target.matches(".select-time")) {
        if (elSelectTime.value == "day") {
            getAllCalendar(`https://islomapi.uz/api/present/day?region=${elSelectRegion.value}`);
        }
        if (elSelectTime.value == "week") {
            getAllCalendar(`https://islomapi.uz/api/present/week?region=${elSelectRegion.value}`);
        }
        if (elSelectTime.value == "month") {
            getAllCalendar(`https://islomapi.uz/api/monthly?region=${elSelectRegion.value}&month=4`);
        }
    };
    if (elSelectRegion.value == "Toshkent") {
        elTimeTitle.textContent = `Siz tanlagan shahar, ${elSelectRegion.value}`;
    } else {
        elTimeTitle.textContent = `Siz tanlagan viloyat, ${elSelectRegion.value}`;
    }

});


const currentTime = document.querySelector(".title-time");
setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

});