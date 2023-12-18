// header_footer.js
window.addEventListener("load", function () {
  // Load the header and footer content dynamically
  loadHeader("header-container");
  loadFooter("footer-container");
});

function loadHeader(containerId) {
  var container = document.getElementById(containerId);

  // Fetch header content
  fetch("header.html")
    .then((response) => response.text())
    .then((headerContent) => {
      container.innerHTML = headerContent;
    })
    .catch((error) => {
      console.error("Error fetching header:", error);
    });
}

function loadFooter(containerId) {
  var container = document.getElementById(containerId);

  // Fetch footer content
  fetch("footer.html")
    .then((response) => response.text())
    .then((footerContent) => {
      container.innerHTML = footerContent;
    })
    .catch((error) => {
      console.error("Error fetching footer:", error);
    });
}
