const fragment = document.createDocumentFragment();
//const url = "http://localhost:9000";
const url = "https://crud-reto2.herokuapp.com";
const path = "/users/api/v1";

/**
 * Codigo javascript que se ejecutan automaticamente al cargar la pagina
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
$(document).ready(async function() {
    await listUser();
  // Call the dataTables jQuery plugin
  $('#dataTable').DataTable();
  setNameUser();
});


/**
 * Consumo mediante axios ala Api por peticiones get READ para llenar la tabla
 *
 * @return Lista de usuarios en formato JSON
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
async function listUser(){
    const request = await fetch(`${url}/users/api/v1/read`, {
        method: 'GET',
        headers: getHeaders()
    });

    let listHtml = '';
    const users = await request.json();

    for (let el of users) {
        let atribute = el.state ? "" : 'class="bg-secondary text-white shadow"';
        let buttonD = '<a href="#" value="'+ el.id +'" id="delButton" class="btn btn-danger btn-circle btn-sm"><i value="'+ el.id +'" id="delButton" class="fas fa-trash"></i></a>';
        let buttonU = '<a href="#" value="'+ el.id +'" id="updButton" class="btn btn-success btn-circle btn-sm"><i value="'+ el.id +'" id="updButton" class="fas fa-pencil"></i></a>';

        userHtml = '<tr '+ atribute +'><td>'+ el.name +' '+ el.surName +'</td><td>'+ el.documentType +'</td><td>'+ el.document +'</td><td>'+ el.email +'</td>' +
            '<td>'+ el.address +'</td><td>'+ el.city +'</td><td>'+ buttonD + buttonU +'</td></tr>';

        listHtml += userHtml;
    }
    document.querySelector('#dataTable tbody').outerHTML = listHtml;
    // Delegacion de eventos
    const element =document.querySelector('#dataTable tbody');
    element.addEventListener("click",(e)=>{
        if(e.target.attributes.id.value=="delButton"){const id = e.target.attributes.value.nodeValue;delUser(id);}
        if(e.target.attributes.id.value=="updButton"){const id = e.target.attributes.value.nodeValue;updUser(id);}
    });
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
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

/**
 * Metodo para eliminar un usuario mediante la peticion fetch
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
async function delUser(id) {
    Swal.fire({
        title: 'Estas seguro?',
        text: "Desea eliminar este usuario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {

            const request = fetch(url + path + '/delete/' + id, {
                method: 'DELETE',
                headers: getHeaders()
            });
            Swal.fire(
                'Borrado!',
                'Usuario eliminado.',
                'success'
            ).then(() => {
                location.reload();
            });
        }
    });
}

/**
 * Funcion para colocar el nombre del usuario logeado
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function setNameUser() {
    document.getElementById("UserName").outerHTML=localStorage.name;
}

/**
 * Funcion para borrar datos almacenados en el navegador
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 2.0.0
 */
function Clear() {
    localStorage.clear();
    window.location.href = "index.html";
}

/**
 * Metodo para eliminar un usuario mediante la peticion fetch
 *
 * @author Jose leonardo poveda <shiwirockztar@gmail.com.co>
 * @since 1.0.0
 */
async function updUser(id) {
    const findRequest = await fetch(url + path + '/findUser/' + id, {
        method: 'GET',
        headers: getHeaders()
    });

    const userRequest = await findRequest.json();
    const user = userRequest[0];

    const { value: formValues } = await Swal.fire({
        title: "Editar",
        html: '<input id="name" class="swal2-input" placeholder="Nombre" value="'+ user.name +'">' +
              '<input id="surName" class="swal2-input" placeholder="Apellido" value="'+ user.surName +'">' +
              '<input id="city" class="swal2-input" placeholder="Ciudad" value="'+ user.city +'">' +
              '<input id="address" class="swal2-input" placeholder="Direccion" value="'+ user.address +'">' +
              '<input id="documentType" list="options" class="swal2-input" placeholder="Identificacion" >' +
              '<datalist id="options">' +
              '<option value="TI">' +
              '<option value="CC">' +
              '</datalist>' +
              '<input id="document" class="swal2-input" placeholder="Numero" value="'+ user.document +'">',
        focusConfirm: false,
        preConfirm: () => {
            let data = {};
            data.id = id;
            data.name = document.getElementById("name").value;
            data.surName = document.getElementById("surName").value;
            data.city = document.getElementById("city").value;
            data.address = document.getElementById("address").value;
            data.documentType = document.getElementById("documentType").value;
            data.document = document.getElementById("document").value;
            data.email = user.email;
            data.level = user.level;
            data.state = user.state;
            data.password = user.password;
            return data;
        }
    })
    const request = fetch(url + path + '/update', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(formValues)
    });


    if (formValues) {
        Swal.fire("Datos modificados").then(() => {
            location.reload();
        });
    }
}

