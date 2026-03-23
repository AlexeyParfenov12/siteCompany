let nameButton = document.querySelectorAll('a')
let mail = document.querySelector(".mail");
let mailValue = "";

console.log(mail)

mail.addEventListener("blur", function () {
  mailValue = mail.value;
  console.log(mailValue)
  nameButton.forEach(function (button) {
    button.href = button.href + "&mail=" + mailValue;
  })
})


