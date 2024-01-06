let productID = document.getElementById("productID");
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productImage = document.getElementById("imageInput");
let productDescription = document.getElementById("productDescription");
let allProducts = JSON.parse(localStorage.getItem("allProducts"));

let addForm = document.getElementById("product-form");
let createButton = document.getElementById("save");
createButton.addEventListener("click", function () {
  addProduct();
  location.href = "dashboard.html";
});

let cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", function () {
  location.href = "dashboard.html";
});
function addProduct() {
  let newProduct = {
    id: productID.value,
    name: productName.value,
    price: `${productPrice.value}`,
    imageUrl: `../images/${productImage.value.slice(12)}`,
    description: productDescription.value,
  };
  newProduct.imageUrl.slice(12);
  allProducts.push(newProduct);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  clearForm();
}
function clearForm() {
  productID.value = "";
  productName.value = "";
  productPrice.value = "";
  productImage.value = "";
  productDescription.value = "";
}
