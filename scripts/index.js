allProducts = JSON.parse(localStorage.getItem("allProducts"));
allUsers = JSON.parse(localStorage.getItem("allUsers"));

// userRegistered = JSON.parse(localStorage.getItem("userRegistered"));
userLogged = JSON.parse(localStorage.getItem("userLogged"));

headerContainer = document.getElementById("header-container");
userInfo = document.getElementById("user-info");
let ourProductDiv = document.getElementById("ourProduct");

window.addEventListener("load", function () {
  displayRandomProducts();
  userInfo.innerText = `Welcome ${userLogged.Email}`;
}); // end of load

// function
function getRandomProducts(products) {
  if (products.length < 3) {
    console.log("The array should contains at least 3 names");
  }
  let rand1 = getRndInteger(0, products.length - 1);
  let rand2 = getRndInteger(0, products.length - 1);
  let rand3 = getRndInteger(0, products.length - 1);

  while (rand1 === rand2 || rand1 === rand3 || rand2 === rand3) {
    rand2 = getRndInteger(0, products.length - 1);
    rand3 = getRndInteger(0, products.length - 1);
  }
  return [products[rand1].id, products[rand2].id, products[rand3].id];
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayRandomProducts() {
  randomProductIds = getRandomProducts(allProducts);
  allProducts.forEach((product) => {
    randomProductIds.forEach((id) => {
      if (product.id === id) {
        let itemDiv = this.document.createElement("div");
        itemDiv.classList.add("product");

        let image = this.document.createElement("img");
        image.src = product.imageUrl;
        let productName = this.document.createElement("p");
        productName.innerText = product.name;
        let price = this.document.createElement("span");
        price.innerText = ` $${product.price}`;

        itemDiv.appendChild(image);
        itemDiv.appendChild(productName);
        itemDiv.appendChild(price);

        ourProductDiv.appendChild(itemDiv);
      }
    }); //end inner loop
  }); // end outer loop
}
