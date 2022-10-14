const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let table = document.getElementById("table-body");

fetch(URL)
.then(response => response.json())
.then(data =>{
    show_products_cart();
})

function show_products_cart (){
    let content = "";
    for(article of cart){
        content +=
    `
    <tr class="${article.id}">
        <td>
           <img src="${article.image}">
        </td>
        <td>
            <p>${article.name}</p>
        </td>
        <td>
            <p>${article.currency}     ${article.unitCost}</p>
        </td>
        <td>
            <input name="amount" min="0" value="${article.count}" id="${article.id}" class="form-control" onkeyup="subtotal(${article.id} , ${article.unitCost})" onclick="subtotal(${article.id},${ article.unitCost})" type="number">
        </td>
        <td>
            <p style="width: 150px; margin:auto;">
            <b>${article.currency}</b> 
            <b class="${article.id}">${article.unitCost}</b>
            </p>
        </td>
        <td>
        <button type="button" class="btn btn-danger" onclick="delete_product(${article.id})">Eliminar</button>
        </td>
    </tr>
    `
    } table.innerHTML = content;
}

function delete_product(id){
    console.log(document.getElementsByClassName(`${id}`)[0])
    let tr = document.getElementsByClassName(`${id}`)[0];
    tr.innerHTML = "";
    cart = cart.filter(article => article.id != id)
    console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
}

 function subtotal(id, cost){
    let total = 0
    let valor1 = document.getElementById(`${id}`);
    let content = document.getElementsByClassName(`${id}`);
    total = valor1.value * cost
    content[1].innerHTML = total;
}

