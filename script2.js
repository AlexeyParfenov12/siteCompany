const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwJHeAh74-LX3GnHOIz1vqTlk1puDJ6DY00uPN8nacaUkDC1p8UnMkKX77SjiGSdqPV2Q/exec";
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
        const finalMail = `${GOOGLE_SCRIPT_URL}?mailValue=${mailValue}`;

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

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp9ekx8RUc9Ybm_PdxzY9yvUx-5K_jRWz_x1MOY1n6ATcDRfKrYjxj-khfnMl2YYbLURjTUYzA6gYH/pub?gid=2146228962&single=true&output=csv";

async function loadCSVData() {
  const response = await fetch(CSV_URL);
  const csvText = await response.text();
  const rows = csvText.split("\n").map((row) => row.split(","));
  function updateStats(rows) {
  if (rows.length >= 3) {
    document.getElementById('order-count').textContent = rows[0][1] || '0';
    document.getElementById('no-order-count').textContent = rows[1][1] || '0';
    document.getElementById('think-count').textContent = rows[2][1] || '0';
  }
}
  updateStats(rows);
}

// window.addEventListener("load", loadCSVData);

// const CSV_URL_LIST_4 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp9ekx8RUc9Ybm_PdxzY9yvUx-5K_jRWz_x1MOY1n6ATcDRfKrYjxj-khfnMl2YYbLURjTUYzA6gYH/pub?gid=2146228962&single=true&output=csv";

// async function loadCSVData() {
//   const response = await fetch(CSV_URL_LIST_4);
//   const csvText = await response.text();
//   const rows = csvText.split("\n").map((row) => row.split(","));
//   function updateStats(rows) {
//   if (rows.length >= 3) {
//     document.getElementById('order-count').textContent = rows[0][1] || '0';
//     document.getElementById('no-order-count').textContent = rows[1][1] || '0';
//     document.getElementById('think-count').textContent = rows[2][1] || '0';
//   }
// }
//   updateStats(rows);
// }

// window.addEventListener("load", loadCSVData);
