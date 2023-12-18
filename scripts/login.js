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
}); // end of email blur

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
}); // end of password blur
var user = {
  Email: `${emailElement.value}`,
  Pass: passwordElement.value,
};
let firstFormElement = this.document.forms[0];
firstFormElement.addEventListener("submit", function (event) {
  if (!(isEmailValid() && isPasswordValid())) {
    event.preventDefault();
    passError.innerText = "Email or password is not correct";
  }
  if (emailElement.value == "elsayedreda760@gmail.com" &&
      passwordElement.value == "10203040"
    ){
     location.replace("../pages/dashboard.html") 
    }
    else if(!(emailElement.value == "elsayedreda760@gmail.com" &&
    passwordElement.value == "10203040")){
  for(let i=0;i<allUsers.length;i++){
  if(allUsers[i].Email === emailElement.value && allUsers[i].passwordElement.value){
    
    localStorage.setItem("currentUser", allUsers[i].userName);
    location.replace("../pages/gallery.html")
  }
}
    }
else
{
  alert("not valid")
}
  if (isuserRegistered()) {
    if (isAdmin) {
      userType = "Admin";
      localStorage.setItem("userType", userType);
      location.href = "../pages/dashboard.html";
      // firstFormElement.action = "dashboard.html";
    } else {
      userType = "Member";
      localStorage.setItem("userType", userType);
      location.href = "../pages/index.html";
    }
    localStorage.setItem("userLogged", JSON.stringify(user));
  } else {
    userType = "public";
    localStorage.setItem("userType", userType);
    event.preventDefault();
    passError.innerText = "Email or password is not registered";
  }
}); // end of submit

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
  // let isRegistered = false;
  for (let index = 0; index < allUsers.length; index++) {
    if (
      user.Email === allUsers[index].Email &&
      user.Pass === allUsers[index].Pass
    ) {
      // isRegistered = true;
      // return isRegistered;
      return true;
    } else {
      return false;
    }
  }
}
let admin = {
  Name : "sayed",
  Password : "123"
}



// function isAdmin() {
//   let isAdmin = false;
//    {
//     // userType = "Admin";
//     // localStorage.setItem("userType", userType);
//     isAdmin = true;
//     return isAdmin;
//   } else {
//     // userType = "Member";
//     // localStorage.setItem("userType", userType);
//     return isAdmin;
//   }
// }
