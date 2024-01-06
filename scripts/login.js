let userType = localStorage.getItem("userType");

if (userType == null) {
  userType = "";
}
let emailElement = document.getElementById("email");
let emailError = document.getElementById("emailError");
emailElement.addEventListener("blur", function () {
  if (!isEmailValid()) {
    if (emailElement.value.trim().length === 0) {
      emailError.innerText = "Please enter your email address ";
    } else {
      emailError.innerText = "Your email address is not valid";
    }
    emailElement.classList.add("incorrect");
    emailElement.classList.remove("correct");
    emailElement.focus();
    emailError.classList.add("error");
  } else {
    emailElement.classList.remove("incorrect");
    emailElement.classList.add("correct");
    emailError.innerText = "";
  }
});

let passwordElement = document.getElementById("password");
let passError = this.document.getElementById("passError");
passwordElement.addEventListener("blur", function () {
  if (!isPasswordValid()) {
    if (passwordElement.value.trim().length === 0) {
      passError.innerText = "Please enter your password ";
    } else if (
      passwordElement.value.trim().length < 8 ||
      passwordElement.value.trim().length > 20
    ) {
      passError.innerText =
        "Your password must have at least 8 digits and max 20 digits";
    }
    passwordElement.classList.add("incorrect");
    passwordElement.classList.remove("correct");
    passwordElement.focus();
    passError.classList.add("error");
  } else {
    passwordElement.classList.remove("incorrect");
    passwordElement.classList.add("correct");
    passError.innerText = "";
  }
});

let userCart = [];
let firstFormElement = this.document.forms[0];
firstFormElement.addEventListener("submit", function (event) {
  if (!(isEmailValid() && isPasswordValid())) {
    event.preventDefault();
    passError.innerText = "Email or password is not correct";
  }
  signed = false;
  let user = {
    Email: emailElement.value,
    Pass: passwordElement.value,
  };
  let loggedUsers = JSON.parse(localStorage.getItem("loggedUsers"));
  if (loggedUsers == null) {
    loggedUsers = [];
  }
  if (isuserRegistered()) {
    if (user.Email === "elsayedreda760@gmail.com" && user.Pass === "10203040") {
      userType = "Admin";
      localStorage.setItem("userType", userType);
      loggedUsers.push(user);
      localStorage.setItem("loggedUsers", JSON.stringify(loggedUsers));
      signed = true;
      localStorage.setItem("signed", signed);
      location.assign("../pages/dashboard.html");
      alert("Admin");
    } else if (
      !(user.Email === "elsayedreda760@gmail.com" && user.Pass === "10203040")
    ) {
      for (let i = 0; i < allUsers.length; i++) {
        if (
          user.Email === allUsers[i].Email &&
          user.Pass === allUsers[i].Pass
        ) {
          userType = "Member";
          localStorage.setItem("userType", userType);
          loggedUsers.push(user);
          signed = true;
          localStorage.setItem("signed", signed);
          localStorage.setItem(
            `${user.Email.split("@")[0]}Cart`,
            JSON.stringify(userCart)
          );
          location.assign("../pages/index.html");
          alert("Member User");
        }
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("loggedUsers", JSON.stringify(loggedUsers));
    } else {
      alert("user is not valid");
    }
  } else {
    userType = "Guest";
    localStorage.setItem("userType", userType);
    event.preventDefault();
    alert("not registered");
    location.assign("../pages/register.html");
  }
});

function isEmailValid() {
  var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailElement.value.match(emailPattern);
}

function isPasswordValid() {
  var passPattern = /^[0-9]{8,20}$/;
  return passwordElement.value.match(passPattern);
}
let allUsers = JSON.parse(localStorage.getItem("allUsers"));
if (allUsers == null) {
  allUsers = [];
}
function isuserRegistered() {
  let user = {
    Email: emailElement.value,
    Pass: passwordElement.value,
  };
  for (let index = 0; index < allUsers.length; index++) {
    if (
      user.Email === allUsers[index].Email &&
      user.Pass === allUsers[index].Pass
    ) {
      localStorage.setItem("currentUser", JSON.stringify(allUsers[index]));
      return true;
    }
  }
  return false;
}

function isEmailLogged() {
  let isLogged = false;
  for (let index = 0; index < loggedUsers.length; index++) {
    if (emailElement.value == loggedUsers[index].Email) {
      isLogged = true;
      return isLogged;
    }
  }
  return isLogged;
}
