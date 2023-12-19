// validate user name
let userNameElement = document.getElementById("userName");
let userNameError = document.getElementById("userNameError");
userNameElement.addEventListener("blur", function () {
  if (!isuserNameValid()) {
    if (!isuserNameLengthValid()) {
      userNameError.innerText =
        "user name must have at least 3 letters and max 12 letter";
    } else {
      userNameError.innerText = "user name is not valid";
    }
    userNameElement.classList.add("incorrect");
    userNameElement.classList.remove("correct");
    userNameElement.focus();
    userNameElement.select();
    userNameError.classList.add("error");
  } else {
    userNameElement.classList.remove("incorrect");
    userNameElement.classList.add("correct");
    userNameError.classList.remove("error");
    userNameError.innerText = "";
    emailElement.focus();
  }
}); // end of username blur

// validate email
let emailElement = document.getElementById("email");
let emailError = document.getElementById("emailError");
emailElement.addEventListener("blur", function () {
  if (isEmailRegistered()) {
    emailElement.classList.add("incorrect");
    emailElement.classList.remove("correct");
    emailElement.focus();
    emailError.innerText = "email is registered";
    emailError.classList.add("error");
  } else if (!isEmailValid()) {
    emailElement.classList.add("incorrect");
    emailElement.classList.remove("correct");
    emailElement.focus();
    emailError.innerText = "email is not valid";
    emailError.classList.add("error");
  } else {
    emailElement.classList.remove("incorrect");
    emailElement.classList.add("correct");
    emailError.innerText = "";
  }
}); // end of email blur

let mobileElement = document.getElementById("phone");
let mobileError = document.getElementById("mobileError");
mobileElement.addEventListener("blur", function () {
  if (!isMobileNumberValid()) {
    mobileElement.classList.add("incorrect");
    mobileElement.classList.remove("correct");
    mobileElement.focus();
    mobileError.innerText = "mobile number is not valid";
    mobileError.classList.add("error");
  } else {
    mobileElement.classList.remove("incorrect");
    mobileElement.classList.add("correct");
    mobileError.innerText = "";
  }
}); // end of mobile blur

let passwordElement = document.getElementById("password");
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
let firstFormElement = document.forms[0];
firstFormElement.addEventListener("submit", function (event) {
  if (
    !(
      isuserNameValid() &&
      isEmailValid() &&
      isMobileNumberValid() &&
      isPasswordValid()
    )
  ) {
    event.preventDefault();
    alert("Your data is not valid");
  } else {
    registerEmail();
    console.log("done");
    location.assign("../pages/index.html");
  }
}); // end of submit

firstFormElement.addEventListener("reset", function (event) {
  if (!confirm("Are you sure you want to clear it ?")) {
    event.preventDefault();
  } else {
    userNameElement.classList.remove("correct");
    emailElement.classList.remove("correct");
    mobileElement.classList.remove("correct");
  }
}); // end of reset

let userCart = [];

function registerEmail() {
  let newUser = {
    UserName: `${userNameElement.value}`,
    Email: emailElement.value,
    Mobile: mobileElement.value,
    Pass: passwordElement.value,
  };
  allUsers.push(newUser);
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  userCart.push(newUser);
  localStorage.setItem(`${newUser.UserName}Cart`, json.stringify(userCart));
  localStorage.setItem("userRegistered", JSON.stringify(newUser));
}

function isuserNameValid() {
  var userNamePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,11}$/;
  if (userNameElement.value.trim().match(userNamePattern)) {
    return true;
  } else return false;
}

function isuserNameLengthValid() {
  return !(
    userNameElement.value.length < 3 || userNameElement.value.length > 12
  );
}
function isEmailValid() {
  var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailElement.value.match(emailPattern);
}

function isMobileNumberValid() {
  let mobilePattern = /^\d{3}\d{8}$/;
  let prefixPattern = /^(010|011|012|015)/;
  let prefixISValid = prefixPattern.test(mobileElement.value.substr(0, 3));

  return mobileElement.value.match(mobilePattern) && prefixISValid;
}

function isPasswordValid() {
  var passPattern = /^[0-9]{8,20}$/;
  return passwordElement.value.match(passPattern);
}
let allUsers = JSON.parse(localStorage.getItem("allUsers"));
if (allUsers === null) {
  allUsers = [];
}

//check email is registered before
function isEmailRegistered() {
  isRegistered = false;
  for (let index = 0; index < allUsers.length; index++) {
    if (emailElement.value == allUsers[index].Email) {
      isRegistered = true;
      return isRegistered;
    }
  }
  return isRegistered;
}
