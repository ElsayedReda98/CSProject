let itemsTable = document.getElementById("items-table");
let confirmButton = document.getElementById("confirm");
let allProducts = JSON.parse(localStorage.getItem("allProducts"));
window.addEventListener("load", function () {
  displayOrderItems();
  renderCart();
  itemsTable.addEventListener("click", function (event) {
    if (event.target.nodeName === "INPUT") {
      item_to_delete = event.target.parentNode.parentNode;
      itemId = item_to_delete.children[0].innerText;
      let deleteConfirm = confirm("Are you sure you want to delete this item?");
      if (deleteConfirm == true) {
        deleteItem(Number(itemId));
        item_to_delete.remove();
        alert("Item was deleted successfully");
      } else {
        event.preventDefault();
      }
    }
  });

  confirmButton.addEventListener("click", function () {
    if (cartItems.length > 0) {
      let confirmation = confirm(
        "Are you sure you want to confirm purchase processing?"
      );
      if (confirmation) {
        confirmPurchase();
        alert("Purchase processing done successfully");
      }
    } else {
      alert("Your cart is empty!!");
    }
  });
});

let cartItems = JSON.parse(localStorage.getItem(`cartItems`));
if (cartItems == null) {
  cartItems = [];
}
function displayOrderItems() {
  let items = document.getElementById("items-body");
  cartItems.forEach((item) => {
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let priceCell = document.createElement("td");
    let imageCell = document.createElement("td");
    let image = document.createElement("img");
    image.src = `${item.imageUrl}`;
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

    idCell.innerText = `${item.id}`;
    nameCell.innerText = `${item.name}`;
    priceCell.innerText = `${item.price}`;
    descCell.innerText = `${item.description.split(",")[0]}`;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(imageCell);
    row.appendChild(descCell);
    row.appendChild(ActionCell);

    items.appendChild(row);
  });
}
function deleteItem(itemId) {
  let restItems = [];
  if (cartItems) {
    restItems = cartItems.filter((item) => item.id !== itemId);
  } else {
    console.log("No items in local storage.");
  }
  localStorage.setItem("cartItems", JSON.stringify(restItems));
  location.reload();
}

function renderCart() {
  orderDetails = document.getElementById("order-details");
  let totalPrice = document.getElementById("total");
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price;
    totalPrice.innerText = total;
  });
}

function confirmPurchase() {
  clearCart();
  renderCart();
  location.reload();
}

function clearCart() {
  cartItems = [];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
