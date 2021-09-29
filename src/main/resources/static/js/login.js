// Call the dataTables jQuery plugin
$(document).ready(function() {

});

async function iniciarSesion(){

    let datos ={};
    datos.email = document.querySelector('#txtEmail').value;
    datos.password = document.querySelector('#txtPassword').value;

    const request = await fetch('api/login',{
    method: 'POST',
    headers:{
    'Accept':'application/json',
    'Content-Type':'application/json'
    },
    body: JSON.stringify(datos)
    });

    const responseBody = await request.text();

    if (responseBody != "FAIL"){

        localStorage.token = responseBody;
        localStorage.email = datos.email;
        window.location.href="usuarios.html"
    }else{
        alert('Las credenciales son incorrectas. Por favor intente nuevamente')
    }


}
