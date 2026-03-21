const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVuJJRz2N41yTmJ37deDowPptZIbxAVduqyuku1ukqd7xWelYWMdVudGXx7v5aCrYNEA/exec";

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
                document.body.innerHTML = `<body style="background-color: #df6565;">
                <h1 style="color: white; text-align: center; margin-top: 200px;">Спасибо за ваш голос! Данные сохранены.</h1>
                </body>
                `;
            })
            .catch(err => console.error("Ошибка отправки:", err));
    }else{
        fetch(finalUrl, { mode: 'no-cors' })
            .then(() => {
                console.log("Данные уже были отправлены в Google Таблицу ранее");
                document.body.innerHTML = `<body style="background-color: #df6565;">
                <h1 style="color: white; text-align: center; margin-top: 200px;">Спасибо за ваш голос, но ваши данные уже были отправлены в Google Таблицу ранее.</h1>
                </body>
                `;
            })
            .catch(err => console.error("Ошибка отправки:", err));
    }
}

startTracking();