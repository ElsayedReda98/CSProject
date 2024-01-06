// window.addEventListener("DomContentLoaded", function () {
userType = localStorage.getItem("userType");
let signOutButton;
let signed = false;
signed = localStorage.getItem("signed");
let logo;
window.addEventListener("load", function () {
  loadHeader("header-container");
  loadFooter("footer-container");
});

async function loadHeader(containerId) {
  var container = document.getElementById(containerId);
  try {
    let response = await fetch("header.html");
    let headerHtml = await response.text();
    container.innerHTML = headerHtml;
  } catch (error) {
    console.error("Error fetching header:", error);
  }
  let dashboradLink = document.getElementById("dashboard-link");
  if (userType !== "Admin") {
    dashboradLink.style.display = "none";
  }
  signOutButton = document.getElementById("signOut");
  if (signed !== "true") {
    signOutButton.style.display = "none";
  }
  logo = document.getElementById("logo");
  if (userType !== "Admin") {
    logo.style.marginLeft = "400px";
  }
}
async function loadFooter(containerId) {
  var container = document.getElementById(containerId);
  try {
    let response = await fetch("footer.html");
    let footerHtml = await response.text();
    container.innerHTML = footerHtml;
  } catch (error) {
    console.error("Error fetching footer:", error);
  }
}
function signOut() {
  localStorage.setItem("signed", false);
  localStorage.setItem("userType", "Guest");
  localStorage.setItem("currentUser", null);
  location.replace("../pages/index.html");
}
