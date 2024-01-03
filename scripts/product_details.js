let nameElement = this.document.getElementById("name");
let nameError = document.getElementById("nameError");
let emailElement = document.getElementById("email");
let emailError = document.getElementById("emailError");

let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
let productDetailsContainer = this.document.getElementById("product-details");
let allUsers = JSON.parse(localStorage.getItem("allUsers"));
let loggedUsers = JSON.parse(localStorage.getItem("loggedUsers"));
let userType = localStorage.getItem("userType");

if (selectedProduct) {
  let fullDescriptionDiv = this.document.createElement("div");
  fullDescriptionDiv.classList.add("product");
  let nameElement = this.document.createElement("h3");
  nameElement.innerText = selectedProduct.name;
  fullDescriptionDiv.appendChild(nameElement);

  let imageSelected = document.createElement("img");
  imageSelected.src = selectedProduct.imageUrl;
  fullDescriptionDiv.appendChild(imageSelected);

  let descriptionSelected = this.document.createElement("p");
  descriptionSelected.innerText = selectedProduct.description;
  fullDescriptionDiv.appendChild(descriptionSelected);

  let priceSelected = this.document.createElement("span");
  priceSelected.classList.add("price");
  priceSelected.innerText = `$ ${selectedProduct.price}`;
  descriptionSelected.appendChild(priceSelected);

  let cartButton = this.document.createElement("input");
  cartButton.type = "button";
  cartButton.value = "My Cart";
  cartButton.setAttribute("id", "cartButton");
  descriptionSelected.appendChild(cartButton);

  productDetailsContainer.appendChild(fullDescriptionDiv);
}

nameElement.addEventListener("blur", function () {
  if (!isNameValid()) {
    if (!isNameLengthValid()) {
      nameError.innerText =
        "name must have at least 3 letters and max 15 letter";
    } else {
      nameError.innerText = "name is not valid";
    }
    nameElement.classList.add("incorrect");
    nameElement.classList.remove("correct");
    nameElement.focus();
    nameError.classList.add("error");
  } else {
    nameElement.classList.remove("incorrect");
    nameElement.classList.add("correct");
    nameElement.classList.remove("error");
    nameError.innerText = "";
  }
});

emailElement.addEventListener("blur", function () {
  if (!isEmailValid()) {
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
});
document.forms[0].addEventListener("submit", function (event) {
  if (!(isEmailValid() && isNameValid())) {
    event.preventDefault();
    alert("Your data is not valid");
  } else if (!isRegistered()) {
    event.preventDefault();
    alert("sorry, you must register first");
    location.assign("../pages/register.html");
  } else if (!isLogged()) {
    event.preventDefault();
    alert("sorry, you must log in first");
    location.assign("../pages/login.html");
  } else {
    buyProduct();
  }
});
function isRegistered() {
  let buyer = {
    Name: nameElement.value,
    Email: emailElement.value,
  };
  for (let i = 0; i < allUsers.length; i++) {
    if (
      buyer.Email === allUsers[i].Email &&
      buyer.Name === allUsers[i].UserName
    ) {
      localStorage.setItem("buyer", JSON.stringify(buyer));
      return true;
    }
  }
  return false;
}
function isLogged() {
  let user = {
    Name: nameElement.value,
    Email: emailElement.value,
  };
  for (let i = 0; i < loggedUsers.length; i++) {
    if (user.Email === loggedUsers[i].Email) {
      return true;
    }
  }
  return false;
}
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userCart;
if (currentUser != null) {
  userCart = JSON.parse(
    localStorage.getItem(`${currentUser.Email.split("@")[0]}Cart`)
  );
}

if (userCart == null) {
  userCart = [];
}
let cartButton = document.getElementById("cartButton");
cartButton.addEventListener("click", function (event) {
  if (userType === "Guest") {
    event.preventDefault();
    alert("you must log in first");
    location.replace("../pages/login.html");
  } else if (userCart.length > 0) {
    location.href = "../pages/cart.html";
  } else {
    alert("Your cart is empty!!");
  }
});

function buyProduct() {
  userCart.push(selectedProduct);
  alert("This item had been added to your cart");
  localStorage.setItem(
    `${emailElement.value.split("@")[0]}Cart`,
    JSON.stringify(userCart)
  );
}

function isNameValid() {
  var namePattern = /^[a-zA-Z][a-zA-Z0-9_]{2,11}$/;
  if (nameElement.value.trim().match(namePattern)) {
    return true;
  } else return false;
}

function isNameLengthValid() {
  return !(nameElement.value.trim() < 3 || nameElement.value.trim().length > 15);
}

function isEmailValid() {
  var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailElement.value.match(emailPattern);
}
