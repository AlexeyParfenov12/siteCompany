

let urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('name');

// Это "чистый" JS, но с использованием внешнего ресурса
async function getUniqueUserId() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip; // Твой IP: "123.45.67.89"
    } catch (e) {
        return null;
    }
}

console.log(name);
getUniqueUserId().then(ip => {
    data_ip_ok.forEach(item => {
        if (item === ip) {
            console.log(item);
        }else{
            data_ip_ok.push(ip);
        }
    });
});

data_ip_ok.forEach(item => {
    console.log(item);
});