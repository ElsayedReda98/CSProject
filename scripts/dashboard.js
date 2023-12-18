let allProducts;
let listTable = document.getElementById("listTable");
window.addEventListener("load", function () {
  // initial display
  displayProducts();
  listTable.addEventListener("click", function (event) {
    if (event.target.nodeName === "INPUT") {
      product_to_delete = event.target.parentNode.parentNode;
      productID = product_to_delete.children[0].innerText;
      let deleteConfirm = confirm("Are you sure you want to delete this item?");
      if (deleteConfirm == true) {
        deleteProduct(Number(productID));
        product_to_delete.remove();
        alert("Item was deleted successfully");
      } else {
        event.preventDefault();
      }
    }
  });
  this.document.forms[0].addEventListener("submit", function () {
    addProduct();
  });
}); // end of load

function displayProducts() {
  allProducts = JSON.parse(localStorage.getItem("allProducts")); // convert to js objects
  let productList = document.getElementById("productList");
  allProducts.forEach((product) => {
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let priceCell = document.createElement("td");
    let imageCell = document.createElement("td");
    let image = document.createElement("img");
    image.src = `${product.imageUrl}`;
    image.width = 50;
    image.height = 50;
    imageCell.appendChild(image);

    let descCell = document.createElement("td");
    let ActionCell = document.createElement("td");
    let deleteInput = document.createElement("input");
    deleteInput.type = "button";
    deleteInput.value = "delete";
    deleteInput.setAttribute("id", "delete");
    ActionCell.appendChild(deleteInput);

    idCell.innerText = `${product.id}`;
    nameCell.innerText = `${product.name}`;
    priceCell.innerText = `${product.price}`;
    descCell.innerText = `${product.description.split(",")[0]}`;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(imageCell);
    row.appendChild(descCell);
    row.appendChild(ActionCell);

    productList.appendChild(row);
  });
}

function addProduct() {
  // if (currentUser && (currentUser === "Admin" || currentUser === "Member")) {
  // }
  let productID = document.getElementById("productID");
  let productName = document.getElementById("productName");
  let productPrice = document.getElementById("productPrice");
  let productImage = document.getElementById("productImageUrl");
  let productDescription = document.getElementById("productDescription");

  let newProduct = {
    id: productID.value,
    name: productName.value,
    price: `${productPrice.value}`,
    imageUrl: productImage.value,
    description: productDescription.value,
  };
  allProducts.push(newProduct);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  displayProducts();
  clearForm();
}
function deleteProduct(productId) {
  let updatedProducts = [];
  if (allProducts) {
    updatedProducts = allProducts.filter((product) => product.id !== productId);
    console.log("Item deleted successfully.");
    // location.reload();
  } else {
    console.log("No items in local storage.");
  }
  localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
}
function clearForm() {
  document.getElementById("productID").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImageUrl").value = "";
  document.getElementById("productDescription").value = "";
}
let currentUser = null;
function setCurrentUser(user) {
  currentUser = user;
  displayProducts();
}
