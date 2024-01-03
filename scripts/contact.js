let nameElement = document.getElementById("name");
let nameError = document.getElementById("nameError");
nameElement.addEventListener("blur", function () {
  showError(nameElement, nameError, isNameValid());
});

let emailElement = document.getElementById("email");
let emailError = document.getElementById("emailError");
emailElement.addEventListener("blur", function () {
  showError(emailElement, emailError, isEmailValid());
});

let firstFormElement = document.forms[0];
firstFormElement.addEventListener("submit", function (event) {
  if (!(isEmailValid() && isNameValid())) {
    event.preventDefault();
    alert("Your data is not valid");
  } else {
    sendMail();
    alert("email sent successfully");
  }
});

function isNameValid() {
  var namePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,11}$/;
  if (nameElement.value.trim().match(namePattern)) {
    return true;
  } else return false;
}

function isNameLengthValid() {
  return !(nameElement.value.length < 3 || nameElement.value.length > 12);
}
function isEmailValid() {
  var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailElement.value.match(emailPattern);
}
function showError(element, error, callBack) {
  if (!callBack) {
    if (element.value.trim().length === 0) {
      error.innerText = `Please enter a valid data `;
    } else {
      error.innerText = `Your ${element.value} is not valid`;
    }
    element.classList.add("incorrect");
    element.classList.remove("correct");
    element.focus();
    error.classList.add("error");
  } else {
    element.classList.remove("incorrect");
    element.classList.add("correct");
    error.innerText = "";
  }
}

async function sendMail() {
  (function () {
    emailjs.init("Vl-je1ElM7thfrQNL");
  })();

  let params = {
    UserName: nameElement.value,
    UserEmail: emailElement.value,
    Message: document.getElementById("subject").value,
  };

  let serviceID = "service_r952t94";
  let templateID = "contact_pthu04d";

  await emailjs
    .send(serviceID, templateID, params)
    .then(() => {
      alert("Email sent successfully");
    })
    .catch(() => {
      alert("there is an error");
    });
}
