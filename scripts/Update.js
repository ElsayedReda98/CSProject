let productToEdit = JSON.parse(localStorage.getItem("productToEdit"));
let productId = document.getElementById("productID");
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productImage = document.getElementById("productImage");
let productDescription = document.getElementById("productDescription");
if (productToEdit) {
  productId.value = productToEdit.id;
  productName.value = productToEdit.name;
  productPrice.value = productToEdit.price;
  productImage = productToEdit.imageUrl;
  productDescription.value = productToEdit.description;
}
let allProducts = JSON.parse(localStorage.getItem("allProducts"));
let saveButtton = document.getElementById("save");

saveButtton.addEventListener("click", function () {
  let p = allProducts.find((product) => product.id == productToEdit.id);
  p.id = productId.value;
  p.name = productName.value;
  p.price = productPrice.value;
  p.imageUrl = productImage;
  p.description = productDescription.value;
  allProducts[allProducts.indexOf(p)] = p;
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  alert("Item was updated successfully");
});
let cancelButtton = document.getElementById("cancel");
cancelButtton.addEventListener("click", function () {
  window.location.href = "../pages/dashboard.html";
});
window.addEventListener("load", function () {});
