//estas son las variables de products con las que trabaje el codigo 
const Product_Id = localStorage.getItem("catID");
let PRODUCT_AUTO = `https://japceibal.github.io/emercado-api/cats_products/${Product_Id}.json`
const auto_products = document.getElementById("products")
const input_min = document.getElementById("filter_min");
const input_max = document.getElementById("filter_max");
const btnFilter = document.getElementById("Filter");
const btnFirst = document.getElementById("btnFirst");
const btnSecond = document.getElementById("btnSecond");
const btnThired = document.getElementById("btnThired");
const btnClear = document.getElementById("Clear");
const inputSearch = document.getElementById("search")
let products_original = [];
let products = [];
let criter_sort = 0;
let search_input = "";
// esta funcion es para mostrar los productos dependiendo de los criterios 
function show_products(products) {
    let contents = "";
    if (criter_sort === 1) {
        products.sort((a, b) => {
            if (a.cost > b.cost) { return -1; };
            if (a.cost < b.cost) { return 1; };
            return 0;
        });
    } else if (criter_sort === 2) {
        products.sort((a, b) => {
            if (a.cost < b.cost) { return -1; };
            if (a.cost > b.cost) { return 1; };
            return 0;
        });
    } else if (criter_sort === 3) {
        products.sort((a, b) => {
            if (a.soldCount > b.soldCount) { return -1; };
            if (a.soldCount < b.soldCount) { return 1; };
            return 0;
        });
    }
    let products_filter = filter(products);
    products_filter = search(products_filter);
    for (let data of products_filter) {
        contents +=
            `<div onclick="setProID(${data.id})" class="products_container">
            <div class="content">
                <div class="product_image">
                    <img src="${data.image}">
                </div>
                <div class="product_description">
                    <div class="product_name">
                        <h4>${data.name} - ${data.currency} ${data.cost}</h4>
                        <small>${data.soldCount} vendidos</small>
                    </div>
                    <p>${data.description}</p>
                </div>
            </div>
        </div> `
    }
    auto_products.innerHTML = contents;
}
//llamado de fetch para obtener los productos
fetch(PRODUCT_AUTO)
    .then(response => response.json())
    .then(data => {
        products_original = data.products;
        products = data.products;
        /* console.log(data.id); */
        show_products(products);

        let name_category = document.getElementById("description")
        name_category.innerHTML = `Verás aquí todos los elementos de la categoría ${data.catName} `
    });
// estos 3 eventos click son del filtrado dependiendo del button, uno filtra por precio de mayor a menor otro de menor a mayor y el ultimo por productos vendidos, se le pasa al "criter_sort" el valor correspondiente para que se ejecute en "show_products" 
btnFirst.addEventListener("click", function () {
    criter_sort = 1
    show_products(products_original);
});

btnSecond.addEventListener("click", function () {
    criter_sort = 2
    show_products(products_original);
});

btnThired.addEventListener("click", function () {
    criter_sort = 3;
    show_products(products_original);
});

//esta funcion lo que haces filtrar los productos dependiendo del valor ingresado en los input de max y min 
function filter(products) {
    let min;
    if (input_min.value !== "" && input_min.value !== undefined) {
        min = input_min.value;
    } else {
        min = -Infinity;
    };
    let max;
    if (input_max.value !== "" && input_max.value !== undefined) {
        max = input_max.value;
    } else {
        max = Infinity;
    };
    return products.filter(data => data.cost >= min && data.cost <= max);
}

// este evento lo que hace es filtrar y ejecutar la funcion "show_products" y filtrar dependiendo de los valores ingresados en los input "max" "min"
btnFilter.addEventListener("click", function () {
    show_products(products_original);
});
//este evento click lo que hace es limpiar todo los filtros, restableciendo todos los productos como estaban
btnClear.addEventListener("click", function () {
    criter_sort = 0;
    input_min.value = "";
    input_max.value = "";
    inputSearch.value = "";
    show_products(products_original);
});

// esta funcion es para buscar por escrito en referencia del titulo y la descripción 
function search(products) {
    let text = inputSearch.value.toLowerCase();
    /* console.log(text); */
    let search = []
    for (data of products) {
        let name = data.name.toLowerCase();
        let description = data.description.toLowerCase();
        if (name.indexOf(text) !== -1 || description.indexOf(text) !== -1) {
            /* console.log(data); */
            search.push(data);
        }
    }
    return search;
}
//este evento "input" busca en tiempo real los datos ingresados en el "inputSearch"
inputSearch.addEventListener("input", function () {
    show_products(products_original);
})
// esta funcion se ejecuta con evento "onclick" que esta en cada producto que lo que hace es redirigir al "product-info.html" del producto 
const productInfo = document.getElementsByClassName("products_container")
function setProID(id) {
    localStorage.setItem("proID", id);
    window.location.href = "product-info.html"
}