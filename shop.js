let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logo = document.querySelector(".img-logo");
console.dir(logo);
let hamburger= document.querySelector("#hamburger");
let collapse=document.querySelector(".collapseNavbar")

window.addEventListener("scroll", () => {
      let scroll = window.scrollY;

      if (scroll > 0) {

            navbar.classList.remove("bg-white-nav");
            navbar.classList.add("nav-scroll");
            hamburger.classList.add("ham1")
            hamburger.classList.remove("ham2");
            collapse.classList.add("collapse2");
            collapse.classList.remove("collapse1");


            changeNavbar("logoPsyY", "#F6E652", "4px solid #F6E652", "transparent");



      } else {
            navbar.classList.remove("nav-scroll");
            navbar.classList.add("bg-white-nav");
            hamburger.classList.add("ham2")
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












fetch("./annunci.json").then((response) => response.json()).then((data) => {
      console.log(data);

      let categoryWrapper = document.querySelector("#categoryWrapper")
      let cardWrapper = document.querySelector("#cardWrapper")

      function setCategoryFilter() {

            let categories = data.map((announcement) => announcement.category);

            // console.log(categories);

            let uniqueCategory = [];

            categories.forEach((category) => {
                  if (!uniqueCategory.includes(category)) {
                        uniqueCategory.push(category)
                  }
            });

            uniqueCategory.forEach((category) => {
                  let div = document.createElement("div");
                  div.classList.add("form-check");
                  div.innerHTML = `
                  <input class="form-check-input" type="radio" name="category" id="${category}">
                  <label class="form-check-label" for="${category}">
                        ${category}
                  </label>
                        `

                  categoryWrapper.appendChild(div);
            })
      }
      setCategoryFilter();


      function showCards(array) {

            cardWrapper.innerHTML = "";

            array.sort((a, b) => b.price - a.price)

            array.forEach((annuncio) => {
                  let div = document.createElement("div")
                  div.classList.add("card", "card-custom")

                  div.innerHTML = `
                  <div class="card">
            <img src="${annuncio.image}" class="card-img-top card-custom-shop img-fluid" alt="...">
            <div class="card-body">
                  <h6 class="card-title titleShopCard">${annuncio.name} </h6>
                  <p class="card-text">€ ${annuncio.price}</p>
                  <p class="card-text">${annuncio.category}</p>
            </div>
      </div>
      `

                  cardWrapper.appendChild(div)
            })
      }

      showCards(data);

      let radios = document.querySelectorAll(".form-check-input");

      function filterByCategory(array) {
            let checked = Array.from(radios).find((button) => button.checked);

            let categoria = checked.id;

            if (categoria != "all") {

                  let filtered = array.filter((annuncio) => annuncio.category == categoria);

                  return filtered

            } else {
                  return data
            }
      }


      radios.forEach((button) => {
            button.addEventListener("click", () => {

                  globalFilter();
            })

      })

      let priceInput = document.querySelector("#priceInput");
      let priceNumber = document.querySelector("#priceNumber");
      let wordInput = document.querySelector("#wordInput");



      function setPriceInput() {
            let maxPrice = data[0].price
            priceInput.max = maxPrice
            priceInput.value = maxPrice

            priceNumber.innerHTML = maxPrice
      }

      setPriceInput();

      priceInput.addEventListener("input", () => {
            priceNumber.innerHTML = priceInput.value

            globalFilter();
      })

      function filterByPrice(array) {
            let filtered = array.filter((annuncio) => +annuncio.price <= +priceInput.value);

            return filtered

      }



      wordInput.addEventListener("input", () => {

            globalFilter();

      })

      function filterByWord(array) {
            let filtered = array.filter((annuncio) => annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()))
            
            return filtered

      }

      function globalFilter() {

            let filterCategory = filterByCategory(data);
            let filterPrice = filterByPrice(filterCategory);
            let filterWord = filterByWord(filterPrice);
            
            showCards(filterWord);
      }
});