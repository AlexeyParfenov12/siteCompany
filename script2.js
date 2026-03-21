const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzgp4VAt9AuWWYRuE6_ZbTvMjAslZsYRvZQJ_9wE0vyo9PkVhIT636nFarA5JF9AjDUUw/exec";
let mail = document.querySelector(".mail");
let button = document.querySelector(".button");
let mailValue = "";

mail.addEventListener("input", function () {
  mailValue = mail.value;
});

button.addEventListener("click", function () {
    async function startTracking() {
      if (mailValue) {
        console.log("Ваш mail:", mailValue);

        // Формируем запрос к Google Таблице
        const finalMail = `${GOOGLE_SCRIPT_URL}?mail=${mailValue}`;

        // Отправляем данные (mode: 'no-cors' нужен, чтобы не было ошибок безопасности)
        fetch(finalMail, { mode: "no-cors" })
          .then(() => {
            console.log("Данные отправлены в Google Таблицу!!!");
            console.log(finalMail)
            // document.body.innerHTML = `<script> setTimeout(() => { window.close() }, 99999); </script><div style="background-color: #f05d5d; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;"><h1 style="color: #ffffff; font-size: 24px; text-align: center; font-weight: bold; font-family: verdana, sans-serif;">Спасибо, за голос! Данные сохранены.</h1></div>`;
          })
          .catch((err) => console.error("Ошибка отправки:", err));
      }
    }

    startTracking();

});