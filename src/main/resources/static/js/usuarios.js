// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
  updateUserEmail();
});

function updateUserEmail(){
    document.querySelector('#txt-email-usuario').innerHTML = localStorage.email;
}

async function cargarUsuarios(){

    const request = await fetch('api/usuarios',{
    method: 'GET',
    headers:getHeaders()
    });

    const usuarios = await request.json();

    console.log(usuarios);

    let listadoHTML='';



    for (let usuario of usuarios){

            let deleteFunction = `deleteUsuario(${usuario.id})`

            let botonEliminar = `<a href="#" onclick=${deleteFunction} class="btn btn-danger btn-circle btn-sm">
                                                              <i class="fas fa-trash"></i>
                                                          </a>`;

            let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono
            let usuarioHTML = `<tr>
                             <td>${usuario.id}</td>
                             <td>${usuario.nombre} ${usuario.apellido}</td>
                             <td>${usuario.email}</td>
                             <td>${telefonoTexto}</td>
                             <td>${botonEliminar}</td>
                            </tr>`;
            listadoHTML += usuarioHTML;
    }

    document.querySelector('#usuarios tbody').innerHTML = listadoHTML;

}

function getHeaders(){
    return {
               'Accept':'application/json',
               'Content-Type':'application/json',
               'Authorization' : localStorage.token
               }
}

async function deleteUsuario(id){

    if(!confirm("Desea eliminar este usuario?")){
        return
    }

    const request = await fetch(`api/usuarios/${id}`,{
    method: 'DELETE',
    headers: getHeaders()
    });

    location.reload()
}
