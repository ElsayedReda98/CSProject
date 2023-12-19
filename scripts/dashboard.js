let allProducts;
let listTable = document.getElementById("listTable");
let addForm = document.getElementById("add-product-form");
let fileInput = document.getElementById("imageInput");
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

  addForm.addEventListener("submit", function (event) {
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
let productID = document.getElementById("productID");
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productImage = document.getElementById("imageInput");
let productDescription = document.getElementById("productDescription");

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
  displayProducts();
  clearForm();
}

function loadPhoto(event) {
  const fileInput = event.target;
  const preview = document.getElementById("imageInput");

  const reader = new FileReader();
  if (fileInput.files && fileInput.files[0]) {
    reader.onload = function (e) {
      preview.src = e.target.result;
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(fileInput.files[0]);
  }
}

function deleteProduct(productId) {
  let updatedProducts = [];
  if (allProducts) {
    updatedProducts = allProducts.filter((product) => product.id !== productId);
    console.log("Item deleted successfully.");
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
