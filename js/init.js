const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

const email_info = localStorage.getItem("email");
const email_storag = document.getElementsByClassName("nav-item");

email_storag[3].innerHTML += `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ${email_info}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href=${localStorage.email === undefined ? "index.html" : "my-profile.html"}>Mi perfil</a></li>
    <li><a class="dropdown-item" href="index.html">Cerrar sesión</a></li>
  </ul>
</div>
`
//linea 53 lo que hice en el href fue usar un ternario para que se fijara si el usuario estaba logueado(condicion: si en el localstorage.email === undefined entonces que lo redirija a index.html para que se logue y si es false que lo redirija a my-profile.html)


// en las siguientes linas de codigo lo que hice es para cuando el usuario entra al E-commerce cargue el carrito(si existe) en la variable cart y si no hay que lo cree vacio
const URL_Product = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let cart = JSON.parse(localStorage.getItem("cart")) || [];


//en este fetch lo que hice es cargar en el "cart" el producto precargado solo si el "cart" esta vacio si existe otro cart ya cargado en el localstorage entonces no guarda el producto precargado 
fetch(URL_Product)
  .then(response => response.json())
  .then(data => {
    if (cart.length === 0) {
      cart.push(data.articles[0]);
    }
    console.log(cart)
  })
