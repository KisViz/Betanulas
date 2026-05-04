const display = document.querySelector("#display");
const visibility = document.querySelector("#visibility");
const opacity = document.querySelector("#opacity");
const htmlElem = document.querySelector(":root");

htmlElem.addEventListener("click", showdisplay);
document.addEventListener("keydown", showdisplay);

function showdisplay() {
  if (display.style.display === "none") {
    display.style.display = "block"
    visibility.style.visibility = "visible"
    opacity.style.opacity = 1
} else {
    display.style.display = "none"
    visibility.style.visibility = "hidden"
    opacity.style.opacity = 0
  }
//   console.log("asd")
}