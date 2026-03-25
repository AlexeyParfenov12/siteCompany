const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwJHeAh74-LX3GnHOIz1vqTlk1puDJ6DY00uPN8nacaUkDC1p8UnMkKX77SjiGSdqPV2Q/exec";

let urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('name') || 'unknown';


let button = document.querySelector(".button");
let mail = document.querySelector(".mail");
let mailValue = "";

button.disabled = true;

if(name === 'order'){
    name = 'Заказываю';
}else if(name === 'noOrder'){
    name = 'Не заказываю';
}else if(name === 'task'){
    name = 'Подумаю';
}

mail.addEventListener("input", function () {
   mailValue = mail.value.trim();
   button.disabled = !mail.validity.valid || !mailValue;
});



button.addEventListener("click", function () {
  startTracking();
});
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
    
    if (ip && mailValue) {
        console.log("Ваш IP:", ip);
        console.log("Имя:", name);
        console.log("Почта:", mailValue)

        // Формируем запрос к Google Таблице
        const finalUrl = `${GOOGLE_SCRIPT_URL}?ip=${ip}&name=${name}&mail=${mailValue}`;

        // Отправляем данные (mode: 'no-cors' нужен, чтобы не было ошибок безопасности)
        fetch(finalUrl, { mode: 'no-cors' })
            .then(() => {
                console.log("Данные отправлены в Google Таблицу!!!");
                document.body.innerHTML = `<div class="filter"></div>
    <div class="container-info">
        <header class="header-info">
            <img src="./assets/img/logo.png" class="logo-info" alt="Novatex">
        </header>
        <main class="content-info">
            <h1 class="title-info">СПАСИБО,<br> ЗА ОБРАТНУЮ<br> СВЯЗЬ!</h1>
            <img class="exc-mark-info" src="./assets/img/image_exc.png" alt="!">
        </main>
    </div>`;
            })
            .catch(err => console.error("Ошибка отправки:", err));
    }
}

// startTracking();

