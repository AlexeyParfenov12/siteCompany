const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVuJJRz2N41yTmJ37deDowPptZIbxAVduqyuku1ukqd7xWelYWMdVudGXx7v5aCrYNEA/exec";

let mail = document.querySelector('.mail');
let button = document.querySelector('.button');
let mailValue = "";

mail.addEventListener('input', function() {
    mailValue = mail.value;
});


button.addEventListener('click', function() {
    if (mail.hasAttribute('required') === true){
        const finalMailValue = `${GOOGLE_SCRIPT_URL}?mail=${mailValue}`;
        fetch(finalMailValue, { mode: 'no-cors' })
            .then(() => {
                console.log("Данные отправлены в Google Таблицу!!!");
                document.body.innerHTML = `<script> setTimeout(() => { window.close() }, 99999); </script><div style="background-color: #f05d5d; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;"><h1 style="color: #ffffff; font-size: 24px; text-align: center; font-weight: bold; font-family: verdana, sans-serif;">Спасибо, за голос! Данные сохранены.</h1></div>`;
            })
            .catch(err => console.error("Ошибка отправки:", err));
    }else{
        console.log('Поле обязательно для заполнения');
    }

    
    
});

