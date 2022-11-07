
const url = "http://localhost:9000";


$(document).ready(async function() {

    await listUser();
    /*await axios.get(`${url}/users/api/v1/read`).then((res)=>{
        const element =document.querySelector(' tbody');
        const text = '<tr>\n' +
            '    <td>Tiger Nixon</td>\n' +
            '    <td>System Architect</td>\n' +
            '    <td>Edinburgh</td>\n' +
            '    <td>61</td>\n' +
            '    <td>2011/04/25</td>\n' +
            '    <td>$320,800</td>\n' +
            '    <td>$320,800</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '    <td>Garrett Winters</td>\n' +
            '    <td>Accountant</td>\n' +
            '    <td>Tokyo</td>\n' +
            '    <td>63</td>\n' +
            '    <td>2011/07/25</td>\n' +
            '    <td>$170,750</td>\n' +
            '    <td>$320,800</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '    <td>Ashton Cox</td>\n' +
            '    <td>Junior Technical Author</td>\n' +
            '    <td>San Francisco</td>\n' +
            '    <td>66</td>\n' +
            '    <td>2009/01/12</td>\n' +
            '    <td>$86,000</td>\n' +
            '    <td>$320,800</td>\n' +
            '</tr>';
        element.innerHTML =text;});*/



    $('#dataTable').DataTable();
});

async function listUser(){

    const element =document.querySelector(' tbody');

    let listHtml = '';
    await axios.get(`${url}/users/api/v1/read`).then((res)=>{

        let json = res.data;
        const text = '<tr>\n' +
            '    <td>Tiger Nixon</td>\n' +
            '    <td>System Architect</td>\n' +
            '    <td>Edinburgh</td>\n' +
            '    <td>61</td>\n' +
            '    <td>2011/04/25</td>\n' +
            '    <td>$320,800</td>\n' +
            '    <td>$320,800</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '    <td>Garrett Winters</td>\n' +
            '    <td>Accountant</td>\n' +
            '    <td>Tokyo</td>\n' +
            '    <td>63</td>\n' +
            '    <td>2011/07/25</td>\n' +
            '    <td>$170,750</td>\n' +
            '    <td>$320,800</td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '    <td>Ashton Cox</td>\n' +
            '    <td>Junior Technical Author</td>\n' +
            '    <td>San Francisco</td>\n' +
            '    <td>66</td>\n' +
            '    <td>2009/01/12</td>\n' +
            '    <td>$86,000</td>\n' +
            '    <td>$320,800</td>\n' +
            '</tr>';
        listHtml += text;
        element.innerHTML =listHtml;
        json.forEach((el)=>{});



    }).catch((err) => {
        console.log(err.response);
        let message = err.response.statusText || "Ocurrió un error";
        $axios.innerHTML = `Error ${err.response.status}: ${message}`;
    }).finally(() => {
        console.log("Finalizando la peticion de usuarios");
    });
}


