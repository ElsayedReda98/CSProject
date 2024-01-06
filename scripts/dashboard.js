let allProducts = JSON.parse(localStorage.getItem("allProducts"));
let pageWrapper = document.getElementById("page-wrapper");
let productList = document.getElementById("productList");
window.addEventListener("load", function () {
  if (productList.children.length == 0) {
    pageWrapper.classList.add("pageWrapper");
  } else {
    pageWrapper.classList.remove("pageWrapper");
  }
});

let listTable = document.getElementById("listTable");
let createButton = document.getElementById("create");
createButton.addEventListener("click", function () {
  location.href = "Add.html";
});
displayProducts();
listTable.addEventListener("click", function (e) {
  if (e.target.nodeName === "INPUT" && e.target.id === "delete") {
    product_to_delete = e.target.parentNode.parentNode;
    productID = product_to_delete.children[0].innerText;
    let deleteConfirm = confirm("Are you sure you want to delete this item?");
    if (deleteConfirm == true) {
      deleteProduct(Number(productID));
      product_to_delete.remove();
      alert("Item was deleted successfully");
    } else {
      e.preventDefault();
    }
  } else if (e.target.nodeName === "INPUT" && e.target.id === "update") {
    product_to_edit = e.target.parentNode.parentNode;
    productID = product_to_edit.children[0].innerText;
    let product = GetProductByID(productID);
    Update(product);
  } else if (e.target.nodeName === "INPUT" && e.target.id === "details") {
    console.log("details");
  }
});

function displayProducts() {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  allProducts.forEach((product) => {
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let priceCell = document.createElement("td");
    let imageCell = document.createElement("td");
    let descCell = document.createElement("td");
    let ActionCell = document.createElement("td");

    let image = document.createElement("img");
    image.src = `${product.imageUrl}`;
    image.width = 50;
    image.height = 50;
    imageCell.appendChild(image);

    let detailsInput = document.createElement("input");
    detailsInput.type = "button";
    detailsInput.value = "details";
    detailsInput.setAttribute("id", "details");
    ActionCell.appendChild(detailsInput);

    let updateInput = document.createElement("input");
    updateInput.type = "button";
    updateInput.value = "update";
    updateInput.setAttribute("id", "update");
    ActionCell.appendChild(updateInput);

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

function deleteProduct(productId) {
  let updatedProducts = [];
  if (allProducts) {
    updatedProducts = allProducts.filter((product) => product.id != productId);
    console.log("Item deleted successfully.");
  } else {
    console.log("No items in local storage.");
  }
  localStorage.setItem("allProducts", JSON.stringify(updatedProducts));
}

function GetProductByID(id) {
  let product = allProducts.find((product) => product.id == id);
  return product;
}
function Update(product) {
  localStorage.setItem("productToEdit", JSON.stringify(product));
  location.href = "Update.html";
}

function search() {}
