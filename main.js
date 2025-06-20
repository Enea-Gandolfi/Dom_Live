let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logo = document.querySelector(".img-logo");
console.dir(logo);
let hamburger= document.querySelector("#hamburger");
let collapse=document.querySelector(".collapseNavbar");

window.addEventListener("scroll", () => {
      let scroll = window.scrollY;

      if (scroll > 0) {

            navbar.classList.remove("bg-white-nav");
            navbar.classList.add("nav-scroll");
            hamburger.classList.add("ham1");
            hamburger.classList.remove("ham2");
            collapse.classList.add("collapse2");
            collapse.classList.remove("collapse1");


            changeNavbar("logoPsyY", "#F6E652", "4px solid #F6E652", "transparent");



      } else {
            navbar.classList.remove("nav-scroll");
            navbar.classList.add("bg-white-nav");
            hamburger.classList.add("ham2");
            hamburger.classList.remove("ham1");
            collapse.classList.add("collapse1");
            collapse.classList.remove("collapse2");

            changeNavbar("logoPsy", "#C52018", "4px solid #C52018", "transparent");
      }

})

function changeNavbar(imgLogo, color1, color2, color3) {

      logo.src = `http://127.0.0.1:5500/media/${imgLogo}.png`;

      links.forEach((link) => {
            link.style.color = color1;

            link.addEventListener("mouseenter", () => {
                  link.style.borderBottom = color2;

            })
            link.addEventListener("mouseleave", () => {
                  link.style.borderBottom = color3;
            })
      })
};


let firstNumber = document.querySelector("#firstNumber");
let secondNumber = document.querySelector("#secondNumber");
let thirdNumber = document.querySelector("#thirdNumber");

function createInterval(number, element, timing) {

      let counter = 0;
      let interval = setInterval(() => {

            if (counter < number) {
                  counter++
                  element.innerHTML = counter
            } else {
                  clearInterval(interval);
            }
      }, timing)
}


let check = false;

let observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

            if (entry.isIntersecting && check == false) {

                  createInterval(1000, firstNumber, 10);
                  createInterval(2000, secondNumber, 5);
                  createInterval(100, thirdNumber, 100);
                  check = true

            }
      })


});

observer.observe(firstNumber);