let container = document.getElementsByClassName("container")[1];
// al cargar la pagina perfil "datosProfile" lo que hace es preguntar si ya hay un "datosProfile" en el localstorage y si hay que lo cargue y sino que deje un array vacio para ser completado
let datosProfile = JSON.parse(localStorage.getItem("datosProfile")) || {}
//Función para mostrar el contenido del perfil 
function content(){
    container.innerHTML = `
    <div class="container mt-4"> 
        <form id="form" action="#" method="get">
            <div class="d-flex justify-content-between">
                <h1 class="mb-5">Perfil</h1>
                <img id="img-profile" src=${datosProfile.image === undefined || datosProfile.image === "" ? `${localStorage.image}` : `"${datosProfile.image}"`} class="img-thumbnail" style="width:130px; height:auto;" alt="image-profile">
            </div>
            <hr>
            <div class="row row-cols-2 mb-5">
                <div class="col">
                    <label class="d-block" for="first-name">Primer Nombre*</label>
                    <input value="${datosProfile.name === undefined || datosProfile.name === "" ? "" : datosProfile.name}" class="col-12 form-control" type="text" id="first-name" required>
                </div>
                <div class="col">
                    <label class="d-block" for="second-name">Segundo Nombre</label>
                    <input value="${datosProfile.secondName === undefined || datosProfile.secondName === "" ? "" : datosProfile.secondName}" class="col-12 form-control" type="text" id="second-name">
                </div>
                <div class="col">
                    <label class="d-block" for="first-surname">Primer Apellido*</label>
                    <input value="${datosProfile.surname === undefined || datosProfile.surname === "" ? "" : datosProfile.surname}" class="col-12 form-control" type="text" id="first-surname" required>
                </div>
                <div class="col">
                    <label class="d-block" for="second-surname">Segundo Apellido</label>
                    <input value="${datosProfile.secondSurname === undefined || datosProfile.secondSurname === "" ? "" : datosProfile.secondSurname}" class="col-12 form-control" type="text" id="second-surname">
                </div>
                <div class="col">
                    <label class="d-block" for="E-mail">E-mail*</label>
                    <input class="col-12 form-control" value="${localStorage.email}" type="email" id="E-mail" required>
                </div>
                <div class="col">
                    <label class="d-block" for="image-profile">Imagen de perfil</label>
                    <input value="" class="col-12 form-control" type="file" id="image-profile">
                </div>
                <div class="col">
                    <label class="d-block " for="phone">Telefono de contacto</label>
                    <input value="${datosProfile.phone}" class="col-12 form-control" type="number" id="phone">
                </div>
            </div>
            <hr>
            <button id="button" class="btn btn-primary" type="submit">Guardar cambios</button>
        </form>
    </div>
    `
}
content()

let form = document.getElementById("form")
let input = document.getElementById("image-profile")
let image = document.getElementById("img-profile")
//evento submit que lo que hace es validar los datos si los input requeridos no estan vacios y guarda los datos en el localstorage para poder verse luego de haber salido del perfil
form.addEventListener("submit", function(e){
    e.preventDefault()
    let name = document.getElementById("first-name");
    let secondName = document.getElementById("second-name");
    let surname = document.getElementById("first-surname");
    let secondSurname = document.getElementById("second-surname");
    let phone = document.getElementById("phone");
    let image = document.getElementById("image-profile");
    datosProfile = {
        name: name.value,
        secondName: secondName.value,
        surname: surname.value,
        secondSurname: secondSurname.value,
        phone: phone.value,
        image: imageBase64,
    }
    if(input.checked === false){
        image.src=`${localStorage.image}`
    }
    /* console.log(datosProfile) */
    localStorage.setItem("datosProfile" , JSON.stringify(datosProfile))
    location.reload()
})

let imageBase64 = ""


//evento que crea la imagen subida en base64 y la guarda en una variable "imageBase64" para luego ser usada en el evento submit para poder verse 
input.addEventListener("change", (e) =>{
    const reader = new FileReader();
    /* console.log(reader); */
    reader.readAsDataURL(e.target.files[0])
    reader.onload = e =>{
        e.preventDefault();
        imageBase64 = e.target.result
        /* console.log(imageBase64) */
    }
})