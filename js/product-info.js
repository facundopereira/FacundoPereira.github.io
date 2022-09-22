let productID = localStorage.getItem("proID")
let URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
let URL_comments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`

const info_container = document.getElementById("container");
const content2 = document.getElementById("content2");
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
})

function show_info_product(){
    let content = "";
    content += 
    `
    <div id="content"> 
        <div id="name">
            <h2>${product_info.name}</h2>
            <hr>
        </div>
        <div id="description">
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
        <div id="images">
            <p><b>Imagenes Ilustrativas</b><br></p>
                <img src="${product_info.images[0]}">
                <img src="${product_info.images[1]}">
                <img src="${product_info.images[2]}">
                <img src="${product_info.images[3]}">
        </div>
    </div>`;
    info_container.innerHTML = content;
}

fetch(URL_comments)
.then(response => response.json())
.then(data =>{
    comments = data;
    show_comments()
    show_relatedProducts()
})


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
    <div>
        <hr>
        <p> Productos Relacionados </p>
        <img onclick="setProID(${product_info.relatedProducts[0].id})" src="${product_info.relatedProducts[0].image}">
        <img onclick="setProID(${product_info.relatedProducts[1].id})" src="${product_info.relatedProducts[1].image}">
    </div>
    `
    content2.innerHTML += content;
}

function setProID(id) {
    localStorage.setItem("proID", id);
    window.location.href = "product-info.html"
}

