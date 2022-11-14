//estas son mis URL y variables que trabajare en el recorrido de este codigo 
let productID = localStorage.getItem("proID")
let URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
let URL_comments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`

const info_container = document.getElementById("container");
const content3 = document.getElementById("content3");
const contComments = document.getElementById("comments");
const btnSean = document.getElementById("send");
const texterea = document.querySelector("#textarea");
const star = document.getElementById("star");

let product_info = [];
let comments = [];
let today = new Date();
let todayDate = today.toLocaleDateString('en-US');
let hour = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

// este es el llamado al producto ingresado 
fetch(URL)
    .then(response => response.json())
    .then(data => {
        product_info = data;
        console.log(product_info);
        show_info_product();
        show_relatedProducts();
    })
//esta funcion lo que hace es mostrar el producto ingresado en la pantalla 
function show_info_product() {
    let content = "";
    content +=
        `
    <div class=" mb-5 shadow-lg bg-body rounded-3 d-flex flex-row-reverse mt-5 container border row" id="content"> 
        <div class="mt-3 ms-auto mx-auto rounded-3 primary-500 bg-light row" id="description">
            <h2>${product_info.name}</h2>
            <hr>
            <p><b>Precio<br></b>
                ${product_info.currency} ${product_info.cost}
            </p>
            <p><b>Descripción</b><br>
                ${product_info.description}
            </p>
            <p><b>Categoria</b><br>
                ${product_info.category}
                </p>
            <p><b>Cantidad vendidos</b><br>
                ${product_info.soldCount}
                </p>
                </div>
                <div class="w-100" id="images">
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="${product_info.images[0]}" class="d-block col-12" alt="img-product">
                </div>
                <div class="carousel-item">
                <img src="${product_info.images[1]}" class="d-block col-12" alt="img-product">
                </div>
                <div class="carousel-item">
                <img src="${product_info.images[2]}" class="d-block col-12" alt="img-product">
                </div>
                <div class="carousel-item">
                <img src="${product_info.images[3]}" class="d-block col-12" alt="img-product">
                </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
            </div>
            </div>
                <button class="btn btn-primary mt-4 pb-2 mb-4 col-11 d-block m-auto" id="btn" onclick="btn()">Agregar al carrito</button>
            </div>`;
    info_container.innerHTML = content;
}
// este es el llamado a los comentarios del producto 
fetch(URL_comments)
    .then(response => response.json())
    .then(data => {
        comments = data;
        show_comments();
    })


console.log(cart);
//aca declare "articleID" para almacenar todos los id del cart para luegar hacer un include y saber si ya existia ese articulo en el cart y asi no volver a agregarlo
let articleId = [];
//esta es la funcion que se ejecuta cuando apretas en el boton agregar al carrito, guarda el producto en una array si no existe en el articleID y lo setea al localstorage luego redirige al cart.html
function btn() {
    for (let article of cart) {
        articleId.push(String(article.id));
    }
    if (!articleId.includes(productID)) {
        let article1 = {
            id: productID,
            name: product_info.name,
            count: "1",
            unitCost: product_info.cost,
            currency: product_info.currency,
            image: product_info.images[0],
        }
        cart.push(article1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    location.href = "cart.html"
}

// este evento agrega un comentario al producto
let myComment
btnSean.addEventListener("click", function (e) {
    e.preventDefault()
    myComment = {
        user: localStorage.getItem("email"),
        description: texterea.value,
        dateTime: todayDate + " " + hour,
        score: star.value,
    }
    texterea.value = "";
    star.value = "1";
    comments.push(myComment)
    console.log(comments)
    show_comments()
})

// esta funcion agrega los comentarios precargados del producto
function show_comments() {
    let content = "";
    for (data of comments) {
        content +=
            `
        <div class="container shadow p-3 mb-4 bg-body rounded-3" id="contentComments">
        <p class="d-inline"><b>${data.user}</b></p><p class="d-inline">- ${data.dateTime} -</p>
            <div class="d-sm-inline" id="commentsHead">
                <span class=" fa fa-star ${data.score >= 1 ? "checked" : ""}"></span>
                <span class=" fa fa-star ${data.score >= 2 ? "checked" : ""}"></span>
                <span class=" fa fa-star ${data.score >= 3 ? "checked" : ""}"></span>
                <span class=" fa fa-star ${data.score >= 4 ? "checked" : ""}"></span>
                <span class=" fa fa-star ${data.score >= 5 ? "checked" : ""}"></span>
            </div>
            <div id="commentsMain">
                <span>${data.description}</span>
            </div>
        </div>
        `
        contComments.innerHTML = content;
    }
}
// esta funcion muestra los productos relacionado 
function show_relatedProducts() {
    let content = "";
    content += `
    <div id="related-products">
        <hr>
        <p class="fs-3 text-center"> Productos Relacionados </p>
        <div class="container d-flex row mx-auto" id="content-related">
            <div class="ms-2 shadow p-2 mb-5 bg-body rounded border ms-auto mx-auto pb-5 col-12 col-md-7 col-lg-5" onclick="setProID(${product_info.relatedProducts[0].id})">
                <img class="w-100 h-100" src="${product_info.relatedProducts[0].image}">
                <span class="text-center fs-4" style="display:block;">${product_info.relatedProducts[0].name}</span>
            </div>
            <div class="ms-2 shadow p-2 mb-5 bg-body rounded border ms-auto mx-auto pb-5 col-12 col-md-7 col-lg-5" onclick="setProID(${product_info.relatedProducts[1].id})">
                <img class="w-100 h-100" src="${product_info.relatedProducts[1].image}">
                <span class="text-center fs-4 " style="display:block;">${product_info.relatedProducts[1].name}</span>
            </div>
        </div>
    </div>
    `
    content3.innerHTML = content;
}
// esta funcion es la que se ejecuta cuando se clickea en un producto relacionado y lo redirige al producto 
function setProID(id) {
    localStorage.setItem("proID", id);
    window.location.href = "product-info.html"
}

