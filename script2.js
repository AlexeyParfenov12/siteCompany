const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwJHeAh74-LX3GnHOIz1vqTlk1puDJ6DY00uPN8nacaUkDC1p8UnMkKX77SjiGSdqPV2Q/exec";
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
          console.log(finalMail);
          // document.body.innerHTML = `<script> setTimeout(() => { window.close() }, 99999); </script><div style="background-color: #f05d5d; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;"><h1 style="color: #ffffff; font-size: 24px; text-align: center; font-weight: bold; font-family: verdana, sans-serif;">Спасибо, за голос! Данные сохранены.</h1></div>`;
        })
        .catch((err) => console.error("Ошибка отправки:", err));
    }
  }

  startTracking();
});

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp9ekx8RUc9Ybm_PdxzY9yvUx-5K_jRWz_x1MOY1n6ATcDRfKrYjxj-khfnMl2YYbLURjTUYzA6gYH/pub?gid=2146228962&single=true&output=csv";

async function loadCSVData() {
  const responseCSV_URL = await fetch(CSV_URL);
  const csvText_CSV_URL = await responseCSV_URL.text();
  const rows_CSV_URL = csvText_CSV_URL.split("\n").map((row) => row.split(","));
  function updateStats(rows_CSV_URL) {
    if (rows_CSV_URL.length >= 3) {
      document.getElementById("order-count").textContent =
        rows_CSV_URL[0][1] || "0";
      document.getElementById("no-order-count").textContent =
        rows_CSV_URL[1][1] || "0";
      document.getElementById("think-count").textContent =
        rows_CSV_URL[2][1] || "0";
    }
  }
  updateStats(rows_CSV_URL);
}

window.addEventListener("load", loadCSVData);

const CSV_URL_LIST_4 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp9ekx8RUc9Ybm_PdxzY9yvUx-5K_jRWz_x1MOY1n6ATcDRfKrYjxj-khfnMl2YYbLURjTUYzA6gYH/pub?gid=1290704733&single=true&output=csv";

let selectOrder = document.getElementById("order-list");
async function loadCSVData1() {
  const response_CSV_URL_LIST_4 = await fetch(CSV_URL_LIST_4);
  const csvText_CSV_URL_LIST_4 = await response_CSV_URL_LIST_4.text();
  const rows_CSV_URL_LIST_4 = csvText_CSV_URL_LIST_4
    .split("\n")
    .map((row) => row.split(","));

  selectOrder.innerHTML = "";

  function updateStats(rows_CSV_URL_LIST_4) {
    for (let i = 0; i < rows_CSV_URL_LIST_4.length; i++) {
      let itemOrder = document.createElement("li");
      itemOrder.textContent = rows_CSV_URL_LIST_4[i][1];
      selectOrder.appendChild(itemOrder);
    }
  }
  updateStats(rows_CSV_URL_LIST_4);
}

window.addEventListener("load", loadCSVData1);

const CSV_URL_LIST_5 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp9ekx8RUc9Ybm_PdxzY9yvUx-5K_jRWz_x1MOY1n6ATcDRfKrYjxj-khfnMl2YYbLURjTUYzA6gYH/pub?gid=559894606&single=true&output=csv";

let selectNotOrder = document.getElementById("not-order-list");
async function loadCSVData2() {
  const response_CSV_URL_LIST_5 = await fetch(CSV_URL_LIST_5);
  const csvText_CSV_URL_LIST_5 = await response_CSV_URL_LIST_5.text();
  const rows_CSV_URL_LIST_5 = csvText_CSV_URL_LIST_5
    .split("\n")
    .map((row) => row.split(","));

  selectNotOrder.innerHTML = "";

  function updateStats(rows_CSV_URL_LIST_5) {
    for (let i = 0; i < rows_CSV_URL_LIST_5.length; i++) {
      let itemNotOrder = document.createElement("li");
      itemNotOrder.textContent = rows_CSV_URL_LIST_5[i][1];
      selectNotOrder.appendChild(itemNotOrder);
    }
  }
  updateStats(rows_CSV_URL_LIST_5);
}

window.addEventListener("load", loadCSVData2);

const CSV_URL_LIST_6 =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRp9ekx8RUc9Ybm_PdxzY9yvUx-5K_jRWz_x1MOY1n6ATcDRfKrYjxj-khfnMl2YYbLURjTUYzA6gYH/pub?gid=2042448798&single=true&output=csv";

let selectThink = document.getElementById("think-list");
async function loadCSVData3() {
  const response_CSV_URL_LIST_6 = await fetch(CSV_URL_LIST_6);
  const csvText_CSV_URL_LIST_6 = await response_CSV_URL_LIST_6.text();
  const rows_CSV_URL_LIST_6 = csvText_CSV_URL_LIST_6
    .split("\n")
    .map((row) => row.split(","));

    selectThink.innerHTML = "";

  function updateStats(rows_CSV_URL_LIST_6) {
    for (let i = 0; i < rows_CSV_URL_LIST_6.length; i++) {
      let itemThink = document.createElement("li");
      itemThink.textContent = rows_CSV_URL_LIST_6[i][1];
      selectThink.appendChild(itemThink);
    }
  }
  updateStats(rows_CSV_URL_LIST_6);
}

window.addEventListener("load", loadCSVData3);
