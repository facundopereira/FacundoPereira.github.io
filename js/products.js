const PRODUCT_AUTO = "https://japceibal.github.io/emercado-api/cats_products/101.json"

fetch(PRODUCT_AUTO)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let auto_products =  document.getElementById("products")
    for (i=0 ; i<data.products.length; i++){
        //console.log(data.products[4].name)
        auto_products.innerHTML += 
        `<div class="products_container">
            <div class="content">
                <div class="product_image">
                    <img src="${data.products[i].image}">
                </div>
                <div class="product_description">
                    <div class="product_name">
                        <h4>${data.products[i].name} - ${data.products[i].currency} ${data.products[i].cost}</h4>
                        <small>${data.products[i].soldCount} vendidos</small>
                    </div>
                    <p>${data.products[i].description}</p>
                </div>
            </div>
        </div> ` 
    }
/*     for (product of data.products){
        //console.log(data.products[4].name)
        auto_products.innerHTML += 
        `<div class="products_container">
            <div class="content">
                <div class="product_image">
                    <img src="${product.image}">
                </div>
                <div class="product_description">
                    <div class="product_name">
                        <h4>${product.name} - ${product.currency} ${product.cost}</h4>
                        <small>${product.soldCount} vendidos</small>
                    </div>
                    <p>${product.description}</p>
                </div>
            </div>
        </div> ` 
    } */
    let name_category= document.getElementById("description") 
    name_category.innerHTML= `Verás aquí todos los elementos de la categoría ${data.catName} `   
    })

    