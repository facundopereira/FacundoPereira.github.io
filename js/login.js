const form_element = document.querySelector("form")
const email_input = document.getElementById("email")
const password_input = document.getElementById("password")
const error_email = document.querySelector(".error_email")
const error_password = document.querySelector(".error_password")
const svg_error = document.querySelector(".img_svg")
const svg_error2 = document.querySelector("#img_svg")


form_element.addEventListener("submit", function(event){
    event.preventDefault();
    if(email_input.value.length===0){
        console.log("email invalide");
        email_input.style.border="0.5px solid red";
        error_email.innerHTML="Ingresa tu E-mail";
        error_email.style.color="red";
        svg_error.style.visibility="visible"; 
    } else {
        svg_error.style.visibility="hidden";
        email_input.style.border="";
        error_email.innerHTML="";
    }    
    if(password_input.value.length===0){
        console.log("password invalide")
        password_input.style.border="0.5px solid red";
        error_password.innerHTML="Ingresa tu contraseña";
        error_password.style.color="red";
        svg_error2.style.visibility="visible";
    }
    else if(email_input.value.length>=10 && password_input.value.length>=8){
        window.location.href = "coverpage.html";
    }
    else if(password_input.value.length<=7){
        error_password.innerHTML="Contraseña incorrecta";
        error_password.style.color="red"
    }

})
