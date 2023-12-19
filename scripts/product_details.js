let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
let productDetailsContainer = this.document.getElementById("product-details");
window.addEventListener("load", function () {
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

  document.forms[0].addEventListener("submit", function (event) {
    buyProduct();
  });

  let myCart = document.getElementById("cartButton");
  myCart.addEventListener("click", function () {
    location.href = "../pages/cart.html";
  });
});

let cart = JSON.parse(localStorage.getItem("cartItems"));
if (cart == null) {
  cart = [];
}
function buyProduct() {
  cart.push(selectedProduct);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  alert("This item had been added to your cart");
}
