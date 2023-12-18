
window.addEventListener("load", function () {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  let galleryDiv = document.getElementById("gallery");
  allProducts.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.className = "product";

    let imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    productDiv.appendChild(imageElement);

    let descriptionSpan = document.createElement("span");
    descriptionSpan.innerText = product.description.split(",")[0];
    productDiv.appendChild(descriptionSpan);

    readMoreLink = document.createElement("a");
    readMoreLink.innerText = "ReadMore";
    readMoreLink.addEventListener("click", function () {
      showFullDescription(product);
      console.log(product);
    }); //end of click

    productDiv.appendChild(readMoreLink);

    galleryDiv.appendChild(productDiv);

    
  });

}); //end of load

function showFullDescription(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product-details.html";
}
