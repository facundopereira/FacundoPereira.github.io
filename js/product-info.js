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
let hour = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() ;


fetch(URL)
.then(response => response.json())
.then(data =>{
    product_info = data;
    console.log(product_info);
    show_info_product();
    show_relatedProducts();
})

function show_info_product(){
    let content = "";
    content += 
    `
    <div id="content"> 
        <div id="description">
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
            <div id="button">
                <button id="btn" onclick="btn()">Agregar al carrito</button>
            </div>
        </div>
        <div id="images">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${product_info.images[0]}" alt="img-product">
              </div>
              <div class="carousel-item">
                <img src="${product_info.images[1]}" alt="img-product">
              </div>
              <div class="carousel-item">
                <img src="${product_info.images[2]}" alt="img-product">
              </div>
              <div class="carousel-item">
                <img src="${product_info.images[3]}" alt="img-product">
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
    </div>`;
    info_container.innerHTML = content;
}

fetch(URL_comments)
.then(response => response.json())
.then(data =>{
    comments = data;
    show_comments();
})


console.log(cart);

let articleId = [];

function btn(){
    for (let article of cart){
        articleId.push(String(article.id));
        }
    if(!articleId.includes(productID)){
        let article1 = {
            id : productID,
            name : product_info.name,
            count : "1",
            unitCost : product_info.cost,
            currency : product_info.currency,
            image : product_info.images[0],
        }
        cart.push(article1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}


let myComment
btnSean.addEventListener("click" , function(e){
    e.preventDefault()
    myComment = {
        user: localStorage.getItem("email"),
        description: texterea.value ,
        dateTime: todayDate +  " " + hour,
        score: star.value,
    }
    texterea.value = "";
    star.value= "1";
    comments.push(myComment)
    console.log(comments)
    show_comments()
})


function show_comments(){
    let content = "";
    for (data of comments){
        content += 
        `
        <div id="contentComments">
            <div id="commentsHead">
                <p><b>${data.user}</b></p><p>- ${data.dateTime} -</p>
                <span class="fa fa-star ${data.score>=1 ? "checked": ""}"></span>
                <span class="fa fa-star ${data.score>=2 ? "checked": ""}"></span>
                <span class="fa fa-star ${data.score>=3 ? "checked": ""}"></span>
                <span class="fa fa-star ${data.score>=4 ? "checked": ""}"></span>
                <span class="fa fa-star ${data.score>=5 ? "checked": ""}"></span>
            </div>
            <div id="commentsMain">
                <p>${data.description}</p>
            </div>
        </div>
        `
        contComments.innerHTML = content;
    }
}

function show_relatedProducts(){
    let content = "";
    content += `
    <div id="related-products">
        <hr>
        <p> Productos Relacionados </p>
        <div id="content-related">
            <div onclick="setProID(${product_info.relatedProducts[0].id})">
                <img src="${product_info.relatedProducts[0].image}">
                <p style="display:inline;">${product_info.relatedProducts[0].name}</p>
            </div>
            <div onclick="setProID(${product_info.relatedProducts[1].id})">
                <img src="${product_info.relatedProducts[1].image}">
                <p style="display:inline;">${product_info.relatedProducts[1].name}</p>
            </div>
        </div>
    </div>
    `
    content3.innerHTML = content;
}

function setProID(id) {
    localStorage.setItem("proID", id);
    window.location.href = "product-info.html"
}

