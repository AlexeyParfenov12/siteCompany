const GOOGLE_SCRIPT_URL = "https://docs.google.com/spreadsheets/d/1lDpEB66m1Vb_UbEOPKgQap4nukE5xxFASrx62ExTi3M/edit?gid=0#gid=0";

let urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('name') || 'unknown';

async function getUniqueUserId() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (e) {
        console.error("Ошибка получения IP:", e);
        return null;
    }
}

async function startTracking() {
    const ip = await getUniqueUserId();
    
    if (ip) {
        console.log("Ваш IP:", ip);
        console.log("Имя:", name);

        // Формируем запрос к Google Таблице
        const finalUrl = `${GOOGLE_SCRIPT_URL}?ip=${ip}&name=${name}`;

        // Отправляем данные (mode: 'no-cors' нужен, чтобы не было ошибок безопасности)
        fetch(finalUrl, { mode: 'no-cors' })
            .then(() => {
                console.log("Данные отправлены в Google Таблицу");
                document.body.innerHTML = `<h1>Спасибо, ${name}! Данные сохранены.</h1>`;
            })
            .catch(err => console.error("Ошибка отправки:", err));
    }
}

startTracking();