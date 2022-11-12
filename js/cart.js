const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
//inputs
let premium = document.getElementById("flexRadioDefault1");
let express = document.getElementById("flexRadioDefault2");
let standard = document.getElementById("flexRadioDefault3");
//table
let table = document.getElementById("table-body");
//content//
let subtotalContent = document.getElementById("subtotal");
let shippingCostContent = document.getElementById("shipping-cost");
let total = document.getElementById("total"); delete_product
//form//
let form = document.getElementById("form");
let inputAmount = document.getElementsByClassName("amount");
let btnForm = document.getElementById("button-form");
let radio15 = document.getElementById("flexRadioDefault1");
let radio7 = document.getElementById("flexRadioDefault2");
let radio5 = document.getElementById("flexRadioDefault3");
let creditCard = document.getElementById("flexRadioDefault4");
let wireTransfer = document.getElementById("flexRadioDefault5");
let shippingForm = document.getElementById("shipping-form");
let calleForm = document.getElementById("calle-form");
let numForm = document.getElementById("numero-form");
let esquinaForm = document.getElementById("esquina-form");
let inputCalle = document.getElementById("input-calle");
let inputNumero = document.getElementById("input-numero");
let inputEsquina = document.getElementById("input-esquina");
let inputForm = document.getElementsByClassName("form-control");
let amountProduct = document.getElementById("product-div");
let transferForm = document.getElementById("transfer-form");
let pTransfer = document.getElementById("p-transfer");
let inputCardNumber = document.getElementById("exampleFormControlInput1");
let inputSecurityCode = document.getElementById("exampleFormControlInput2");
let inputExpiration = document.getElementById("exampleFormControlInput3");
let inputAccountNumber = document.getElementById("exampleFormControlInput4");

let success = ""
let alerta = document.getElementById("alert");

fetch(URL)
    .then(response => response.json())
    .then(data => {
        show_products_cart();
        calculate();
        shippingCost();
    })

fetch(CART_BUY_URL)
    .then(response => response.json())
    .then(data => {
        success = data.msg
        console.log(success)
    })

function show_products_cart() {
    let content = "";
    for (article of cart) {
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
            <input name="amount" min="0" value="${article.count}"  id="${article.id}" class="form-control amount" onkeyup="subtotal(${article.id} , ${article.unitCost}), calculate(), shippingCost()" onclick="subtotal(${article.id},${article.unitCost}), calculate(), shippingCost()" type="number">
        </td>
        <td>
            <p style="width: 150px; margin:auto;">
            <b class="${article.id}">${article.currency}</b> 
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

function delete_product(id) {
    let tr = document.getElementsByClassName(`${id}`)[0];
    tr.innerHTML = "";
    cart = cart.filter(article => article.id != id);
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    calculate();
    shippingCost();
}

function subtotal(id, cost) {
    let total = 0;
    let valor1 = document.getElementById(`${id}`);
    let content = document.getElementsByClassName(`${id}`);
    total = valor1.value * cost;
    content[2].innerHTML = total;
}

let unitCost = 0;

function calculate() {
    unitCost = 0;
    for (let id of cart) {
        let valor1 = parseInt(document.getElementsByClassName(`${id.id}`)[2].textContent);
        if (id.currency === "UYU") {
            valor1 = Math.round(valor1 / 40);
            unitCost += valor1;
        } else {
            unitCost += valor1;
        }
    }
    subtotalContent.innerHTML = `USD ${unitCost}`;
}

let costshipping = 0;

premium.addEventListener("click", function () {
    if (premium.checked) {
        costshipping = Math.round(unitCost * 0.15);
        shippingCostContent.innerHTML = `USD ${costshipping}`;
    }
    total.innerHTML = `USD ${costshipping + unitCost}`
});

express.addEventListener("click", function () {
    if (express.checked) {
        costshipping = Math.round(unitCost * 0.07);
        shippingCostContent.innerHTML = `USD ${costshipping}`;
    }
    total.innerHTML = `USD ${costshipping + unitCost}`
});

standard.addEventListener("click", function () {
    if (standard.checked) {
        costshipping = Math.round(unitCost * 0.05);
        shippingCostContent.innerHTML = `USD ${costshipping}`;
    }
    total.innerHTML = `USD ${costshipping + unitCost}`
});

function shippingCost() {
    if (premium.checked) {
        costshipping = Math.round(unitCost * 0.15);
        console.log(costshipping);
        shippingCostContent.innerHTML = `USD ${costshipping}`;
    }
    else if (express.checked) {
        costshipping = Math.round(unitCost * 0.07);
        console.log(costshipping);
        shippingCostContent.innerHTML = `USD ${costshipping}`;
    }
    else if (standard.checked) {
        costshipping = Math.round(unitCost * 0.05);
        console.log(costshipping);
        shippingCostContent.innerHTML = `USD ${costshipping}`;
    } else {
        shippingCostContent.innerHTML = `USD 0`;
    }
    total.innerHTML = `USD ${costshipping + unitCost}`
}

form.addEventListener("submit", e => {
    e.preventDefault()
    let value = []
    for (let input of inputAmount) {
        value.push(input.value)
        console.log(value)
        if (value.includes("0")) {
            amountProduct.innerHTML = `<p class="text-danger text-center"> Aumenta la cantidad del producto</p>`
        } else if (document.getElementById(`${article.id}`).value > "0") {
            amountProduct.innerHTML = ""
        }
    }
    if (!radio15.checked && !radio7.checked && !radio5.checked) {
        radio15.classList.add("is-invalid")
        radio7.classList.add("is-invalid")
        radio5.classList.add("is-invalid")
        shippingForm.innerHTML = `<span class="text-danger m-3 " >Seleccione un tipo de envío</span>`
    } else if (radio15.checked || radio7.checked || radio5.checked) {
        shippingForm.innerHTML = `<span class="text-danger m-3 " ></span>`
    }
    if (inputCalle.value.length === 0) {
        inputCalle.classList.add("is-invalid")
        calleForm.className = "text-danger"
        calleForm.innerHTML = "Ingresa una calle"
    } else if (inputForm[1].value.length != 0) {
        calleForm.innerHTML = ""
    }
    if (inputNumero.value.length === 0) {
        inputNumero.classList.add("is-invalid")
        numForm.className = "text-danger"
        numForm.innerHTML = "Ingresa un número"
    } else if (inputForm[2].value.length != 0) {
        numForm.innerHTML = ""
    }
    if (inputEsquina.value.length === 0) {
        inputEsquina.classList.add("is-invalid")
        esquinaForm.className = "text-danger"
        esquinaForm.innerHTML = "Ingresa una esquina"
    } else if (inputForm[3].value.length != 0) {
        esquinaForm.innerHTML = ""
    }
    if (!creditCard.checked && !wireTransfer.checked) {
        creditCard.classList.add("is-invalid")
        wireTransfer.classList.add("is-invalid")
        inputCardNumber.classList.add("is-invalid")
        inputExpiration.classList.add("is-invalid")
        inputSecurityCode.classList.add("is-invalid")
        inputAccountNumber.classList.add("is-invalid")
        console.log("tarjeta de credito")
        transferForm.innerHTML = `<p class="text-danger m-0"> Seleccione una forma de pago</p>`
    } else if (creditCard.checked) {
        inputCardNumber.value.length === 0 ? (transferForm.innerHTML = `<p class="text-danger m-0"> Ingrese numero de tarjeta </p>`, inputCardNumber.classList.add("is-invalid")) : ""
        inputExpiration.value.length === 0 ? (transferForm.innerHTML = `<p class="text-danger m-0"> Ingrese fecha de vencimiento </p>`, inputExpiration.classList.add("is-invalid")) : ""
        inputSecurityCode.value.length === 0 ? (transferForm.innerHTML = `<p class="text-danger m-0"> Ingrese codigo de seguridad </p>`, inputSecurityCode.classList.add("is-invalid")) : ""
        inputCardNumber.value.length != 0 && inputExpiration.value.length != 0 && inputSecurityCode.value.length != 0 ? transferForm.innerHTML = "" : ""
    } else if (wireTransfer.checked) {
        inputAccountNumber.value.length === 0 ? (transferForm.innerHTML = `<p class="text-danger m-0"> Ingrese numero de cuenta </p>`, inputAccountNumber.classList.add("is-invalid")) : ""
        inputAccountNumber.value.length != 0 ? transferForm.innerHTML = "" : ""
    }
    if (!value.includes("0") && (radio15.checked || radio7.checked || radio5.checked) && inputForm[1].value.length != 0 && inputForm[2].value.length != 0 && inputForm[3].value.length != 0 && (creditCard.checked || wireTransfer.checked) && inputAccountNumber.value.length != 0) {
        alerta.classList.remove("d-none")
        alerta.innerHTML = `${success}`
        inputCalle.value = ""
        inputEsquina.value = ""
        inputNumero.value = ""
        inputAccountNumber.value = ""
        inputCardNumber.disabled = false
        inputExpiration.disabled = false
        inputSecurityCode.disabled = false
        radio15.checked = false
        radio5.checked = false
        radio7.checked = false
        wireTransfer.checked = false
        inputCalle.classList.remove("is-valid")
        inputEsquina.classList.remove("is-valid")
        inputNumero.classList.remove("is-valid")
        inputCardNumber.classList.remove("is-valid")
        inputExpiration.classList.remove("is-valid")
        inputSecurityCode.classList.remove("is-valid")
        inputAccountNumber.classList.remove("is-valid")
        radio15.classList.remove("is-valid")
        radio5.classList.remove("is-valid")
        radio7.classList.remove("is-valid")
        wireTransfer.classList.remove("is-valid")
        table.innerHTML = ""
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        subtotalContent.innerHTML = `USD 0`;
        shippingCostContent.innerHTML = `USD 0`;
        total.innerHTML = `USD 0`
        pTransfer.innerHTML = `No ha seleccionado <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Selecionar
                </a>`
        function vanish() {
            alerta.className += " d-none"
        }
        setTimeout(vanish, 3000);
    } else if (!value.includes("0") && (radio15.checked || radio7.checked || radio5.checked) && inputForm[1].value.length != 0 && inputForm[2].value.length != 0 && inputForm[3].value.length != 0 && (creditCard.checked || wireTransfer.checked) && inputCardNumber.value.length != 0 && inputExpiration.value.length != 0 && inputSecurityCode.value.length != 0) {
        alerta.classList.remove("d-none")
        alerta.innerHTML = `${success}`
        inputCalle.value = ""
        inputEsquina.value = ""
        inputNumero.value = ""
        inputCardNumber.value = ""
        inputExpiration.value = ""
        inputSecurityCode.value = ""
        inputAccountNumber.disabled = false
        radio15.checked = false
        radio5.checked = false
        radio7.checked = false
        creditCard.checked = false
        table.innerHTML = ""
        inputCalle.classList.remove("is-valid")
        inputEsquina.classList.remove("is-valid")
        inputNumero.classList.remove("is-valid")
        inputCardNumber.classList.remove("is-valid")
        inputExpiration.classList.remove("is-valid")
        inputSecurityCode.classList.remove("is-valid")
        inputAccountNumber.classList.remove("is-valid")
        radio15.classList.remove("is-valid")
        radio5.classList.remove("is-valid")
        radio7.classList.remove("is-valid")
        creditCard.classList.remove("is-valid")
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        subtotalContent.innerHTML = `USD 0`;
        shippingCostContent.innerHTML = `USD 0`;
        total.innerHTML = `USD 0`
        pTransfer.innerHTML = `No ha seleccionado <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Selecionar
                </a>`
        function vanish() {
            alerta.className += " d-none"
        }
        setTimeout(vanish, 3000);
    }
})

creditCard.addEventListener("click", function () {
    if (creditCard.checked) {
        pTransfer.innerHTML = `Tarjeta de credito <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Selecionar
          </a>`
        inputAccountNumber.value = ""
        creditCard.classList.add("is-valid")
        wireTransfer.classList.remove("is-valid")
        wireTransfer.classList.remove("is-invalid")
        inputAccountNumber.classList.remove("is-invalid")
        inputAccountNumber.classList.remove("is-valid")
        inputCardNumber.disabled = false
        inputExpiration.disabled = false
        inputSecurityCode.disabled = false
        inputAccountNumber.disabled = true
    }
})

wireTransfer.addEventListener("click", function () {
    if (wireTransfer.checked) {
        pTransfer.innerHTML = `Transferencia bancaria <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Selecionar
          </a>`
        inputCardNumber.value = ""
        inputExpiration.value = ""
        inputSecurityCode.value = ""
        wireTransfer.classList.add("is-valid")
        creditCard.classList.remove("is-valid")
        creditCard.classList.remove("is-invalid")

        inputCardNumber.classList.remove("is-invalid")
        inputCardNumber.classList.remove("is-valid")
        inputExpiration.classList.remove("is-invalid")
        inputExpiration.classList.remove("is-valid")
        inputSecurityCode.classList.remove("is-invalid")
        inputSecurityCode.classList.remove("is-valid")

        inputAccountNumber.disabled = false
        inputCardNumber.disabled = true
        inputExpiration.disabled = true
        inputSecurityCode.disabled = true
    }
})

form.addEventListener("input", function () {
    if (radio15.checked || radio7.checked || radio5.checked) {
        radio5.classList.remove("is-invalid")
        radio7.classList.remove("is-invalid")
        radio15.classList.remove("is-invalid")
        radio15.classList.add("is-valid")
        radio7.classList.add("is-valid")
        radio5.classList.add("is-valid")
        shippingForm.innerHTML = `<span class="text-danger m-3 " ></span>`
    }
    if (inputCalle.value.length > 0) {
        inputCalle.classList.remove("is-invalid")
        inputCalle.classList.add("is-valid")
        calleForm.innerHTML = ""
    } else {
        inputCalle.classList.add("is-invalid")
    }
    if (inputNumero.value.length > 0) {
        inputNumero.classList.remove("is-invalid")
        inputNumero.classList.add("is-valid")
        numForm.innerHTML = ""
    } else {
        inputNumero.classList.add("is-invalid")
    }
    if (inputEsquina.value.length > 0) {
        inputEsquina.classList.remove("is-invalid")
        inputEsquina.classList.add("is-valid")
        esquinaForm.innerHTML = ""
    } else {
        inputEsquina.classList.add("is-invalid")
    }
    if (inputAccountNumber.value.length > 0) {
        inputAccountNumber.classList.add("is-valid")
        inputAccountNumber.classList.remove("is-invalid")
    } else if (wireTransfer.checked && inputAccountNumber.value.length === 0) {
        inputAccountNumber.classList.add("is-invalid")
    }
    if (inputCardNumber.value.length > 0) {
        inputCardNumber.classList.add("is-valid")
        inputCardNumber.classList.remove("is-invalid")
    } else if (creditCard.checked && inputCardNumber.value.length === 0) {
        inputCardNumber.classList.add("is-invalid")
    }
    if (inputExpiration.value.length > 0) {
        inputExpiration.classList.add("is-valid")
        inputExpiration.classList.remove("is-invalid")
    } else if (creditCard.checked && inputExpiration.value.length === 0) {
        inputExpiration.classList.add("is-invalid")
    }
    if (inputSecurityCode.value.length > 0) {
        inputSecurityCode.classList.add("is-valid")
        inputSecurityCode.classList.remove("is-invalid")
    } else if (creditCard.checked && inputSecurityCode.value.length === 0) {
        inputSecurityCode.classList.add("is-invalid")
    }
    if (wireTransfer.checked) {
        wireTransfer.classList.remove("is-invalid")
        wireTransfer.classList.add("is-valid")
    }
    if (creditCard.checked) {
        creditCard.classList.remove("is-invalid")
        creditCard.classList.add("is-valid")
    }
})
