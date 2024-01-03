let products = [
  {
    id: 1,
    name: "Legion 5 Pro",
    price: 10,
    imageUrl: "../images/1.png",
    description:
      "Lenovo Legion 5 Pro, 16ACH6H Gaming Laptop 16” 165Hz IPS Dolby Vision HDR (100% sRGB)",
  },
  {
    id: 2,
    name: "Dell G15 5520",
    price: 20,
    imageUrl: "../images/2.png",
    description:
      "Dell G15 5520 15.6 120Hz,  Intel Core i7-12700H, RTX 3060, 16GB RAM, 512GB SSD, Backlit Arabic",
  },
  {
    id: 3,
    name: "IPG3 Ryzen 7 6800H",
    price: 30,
    imageUrl: "../images/3.png",
    description:
      "Lenovo IdeaPad Gaming 3, 15ARH7 15.6″ 120Hz IPS FHD, AMD Ryzen 7 6800H, RTX 3050 4GB GPU, 8GB",
  },
  {
    id: 4,
    name: "IPG3 i7-11370H",
    price: 40,
    imageUrl: "../images/4.png",
    description:
      "Lenovo IdeaPad Gaming 3, 15IHU6 15.6″ 120Hz IPS , Intel Core i7-11370H, GTX 1650, 8GB RAM, 1TB",
  },
  {
    id: 5,
    name: "HP Omen i7-11800H",
    price: 50,
    imageUrl: "../images/5.png",
    description:
      "HP Omen 16-B0013DX 16.1, 144Hz IPS  Intel Core i7-11800H, RTX 3060, 16GB RAM, 512GB SSD,",
  },
  {
    id: 6,
    name: "Acer i7-11800H",
    price: 60,
    imageUrl: "../images/6.png",
    description:
      "Acer Predator Helios 300, Gaming Laptop 15.6” FHD 144Hz, Intel Core i7-11800H, RTX 3060 6GB GPU,",
  },
  {
    id: 7,
    name: "ASUS i7-11370H",
    price: 70,
    imageUrl: "../images/7.png",
    description:
      "ASUS TUF Dash F15, FX516P 15.6 144Hz IPS, Intel Core i7-11370H, RTX 3060 6GB GPU, 16GB RAM, 512GB",
  },
  {
    id: 8,
    name: "Alienware x15",
    price: 80,
    imageUrl: "../images/8.png",
    description:
      "Alienware x15 15.6 Gaming Laptop, Intel Core i7-11800H, 16GB, NVIDIA GeForce RTX 3060, 256GB",
  },
  {
    id: 9,
    name: "Dell G15 5530",
    price: 90,
    imageUrl: "../images/9.png",
    description:
      "Dell G15 5530 Gaming Laptop 15.6, FHD (1920×1080) 165Hz (100% sRGB), Intel Core i7-13650HX, RTX",
  },
  {
    id: 10,
    name: "MSI Katana i7-11800H",
    price: 100,
    imageUrl: "../images/10.png",
    description:
      "MSI Katana GF66 Gaming, Laptop 15.6” 144Hz IPS FHD, Intel Core i7-11800H, RTX 3050 Ti 4GB GPU,",
  },
  {
    id: 11,
    name: "HP i5-11800H",
    price: 200,
    imageUrl: "../images/11.png",
    description:
      "HP A66 Work station, Laptop 15.6” 144Hz IPS FHD, Intel Core i7-11800H, GTX 1650 Ti 2GB GPU,",
  },
  {
    id: 12,
    name: "Lenovo i5-9300FH",
    price: 300,
    imageUrl: "../images/4.png",
    description:
      "Lenovo Ideapad l340 15.6, 60Hz IPS FHD, Intel Core i5-9300FH, Nvidia GTX 1650 4GB GPU,",
  },
];
localStorage.setItem("allProducts", JSON.stringify(products));

// signed = false;
// localStorage.setItem("signed", signed);
// signOutButton = document.getElementById("signOut");
// if (signed == "false") {
//   signOutButton.style.display = "none";
// }

allProducts = JSON.parse(localStorage.getItem("allProducts"));
allUsers = JSON.parse(localStorage.getItem("allUsers"));

userLogged = JSON.parse(localStorage.getItem("userLogged"));

headerContainer = document.getElementById("header-container");
userInfo = document.getElementById("user-info");
let ourProductDiv = document.getElementById("ourProduct");

window.addEventListener("load", function () {
  displayRandomProducts();
  if (userLogged) {
    //userInfo.innerText = `Welcome ${userLogged.Email}`;
  }
});

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
    });
  });
}
