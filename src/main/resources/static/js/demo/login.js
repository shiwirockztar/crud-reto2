const fragment = document.createDocumentFragment();
//const url = "http://localhost:9000";
const url = "https://crud-reto2.herokuapp.com";
const path = "/users/api/v1";

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
 * Metodo para iniciar seccion mediante la peticion fetch
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
async function start() {

    let data = {};

    data.email = document.getElementById( 'textEmail').value;
    data.password = document.getElementById( 'textPassword').value;

    const request = await fetch(url + path + '/login' , {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    const answer = await request.json();
    if (answer.length){
        localStorage.token = answer[0];
        localStorage.name = answer[1];
        localStorage.email = data.email;
        window.location.href = 'usuarios.html';
    }
    else {Swal.fire('Datos erroneos');}
}

/**
 * Metodo para eliminar un usuario mediante la peticion fetch
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
async function startA() {

    let data = {};

    data.email = document.getElementById( 'textEmail').value;
    data.password = document.getElementById( 'textPassword').value;

    const request = await fetch(url + path + '/login' , {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    //const answer = await request.json();
    const answer = await request.text();
    console.log(answer);
    if (answer=="OK"){
        window.location.href = 'usuarios.html';
    }
    else {alert("usuario inexistente");}
}