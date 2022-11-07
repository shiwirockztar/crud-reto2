const fragment = document.createDocumentFragment();
//const url = "http://localhost:9000";
const url = "https://crud-reto2.herokuapp.com";
const path = "/users/api/v1";
const form = document.querySelector( 'form.formulario');

/**
 * Plantilla de errores de alertas para sweet alert
 */
const templateErrorNotification ={
    name: "Digite su nombre",
    surName: "Digite su apellido",
    email: "Digite su correo",
    password: "Digite la contraseña",
    city: "Digite su ciudad",
    address: "Digite su numero de direccion",
    documentType: "Elija un tipo de documento",
    document : "Digite su numero de documento"
}


/**
 * Parametros Headers necesarios para la peticiion fetch
 *
 * @return Parametros Headers
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

/**
 * Metodo para eliminar un usuario mediante la peticion fetch
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
async function registerUser() {
    let data = {};
    data.name = document.getElementById( 'textName').value;
    data.surName = document.getElementById( 'textSurName').value;
    data.email = document.getElementById( 'textEmail').value;
    data.password = document.getElementById( 'textPassword').value;
    let repeatPassword = document.getElementById( 'repeatPassword').value;
    data.city = document.getElementById( 'textCity').value;
    data.address = document.getElementById( 'textAddress').value;
    data.documentType = document.getElementById( 'docType').getAttribute("value");
    data.document = document.getElementById( 'textDocument').value;

    // Default values
    data.level = "user";
    data.state = 1;

    var veryfied = verificator(data,repeatPassword);

    if (veryfied){
        const request = await fetch(url + path + '/create', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });

        Swal.fire({
            title: 'Cuenta fue creada con exito!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then(() => {
            window.location.href = 'index.html';
        });

        const user = await request.json();
    }
}// Execution function
const register = document.getElementById("register");
register.onclick=registerUser;

/**
 * Metodos para verificar campos vacios del formulario de login
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function verificator(data,repeatPassword ){

    let v =true;
    Object.entries(data).forEach(([key, value]) => {
        if (value==""||value==null){
            errorNotification(templateErrorNotification[key]);
            v=false;
        }
        if (repeatPassword != data.password ) {
            errorNotification('Las contraseñas no coinciden');
            v=false;
        }
    });
    return v;
}

/**
 * Funcion para seleccionar el tipo de documento mediante una Sweet alert
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function selected () {
    const { value: doc } =  Swal.fire({
        title: 'Seleccion documento',
        input: 'select',
        inputOptions: {
            'cc': 'Cedula de ciudadania',
            'ti': 'Tarjeta de identidad'
        },
        inputPlaceholder: 'Elija su tipo de documento',
        showCancelButton: true,
        inputValidator: (value) => {

            return new Promise((resolve) => {
                if (value ) {
                    setHtmlValue(value);
                    resolve();
                }
                else{
                    resolve('Necesitas elegir un tipo de documento :)')
                }
            })
        }
    })
}

/**
 * Metodos para modificar el html de acuerdo al valor de documento
 * (ya que no funciona la variable doc para eso)
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function setHtmlValue (value){
    document.getElementById( 'docType').setAttribute('value',value);
    document.querySelector("#docType a span i").setAttribute('class','fas fa-check' );
    //document.querySelector("#docType a span.text").innerHTML=value;
    if (value==='cc'){document.querySelector("#docType a span.text").innerHTML='Cedula de ciudadania';}
    if (value==='ti'){document.querySelector("#docType a span.text").innerHTML='Tarjeta de identidad';}
}

/**
 * Mensaje de error Sweet alert para contraseñas diferentes
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function errorNotification(msg){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'error',
        title: msg
    })
}


/**
 * Validacion de correo
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function validate (){
    //span.setAttribute("class","valid");
    let span = document.getElementById('status');
    let email = document.getElementById('textEmail').value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email. match (pattern)){
        span. classList.add('valid');
        span. classList.remove('invalid');
        span. innerHTML = "Email Correcto.";
        span.style.color= "#4caf50";

    }
    else{
        span. classList. remove('valid');
        span. classList.add('invalid');
        span. innerHTML = "Por favor introduce un Email Valido.";
        span.style.color= "#f44336";
    }
    if(email==""){
        span. innerHTML = "";
    }

}// Execution function
const validater = document.getElementById("textEmail");
validater.onkeyup=validate;


/**
 * envia dato al campo de correo
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function bonus (){
    document.getElementById('textEmail').value="@.com";
}
const index = document.querySelector(".fab.fa-facebook-f.fa-fw");
index.onclick=bonus;