export default function getUser (mail, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.response);
            datos.correo = mail;
            datos.pperdidas = datos.pjugadas - datos.pganadas;
            localStorage.setItem('usuario7reinas', JSON.stringify(datos));
            doNext();
        } else {
            alert(`Se ha producido un error al obtener los datos del usuario.`);
        }
    }
    xhr.open('GET', `http://20.160.173.253:3001/api/jugador/get/${mail}`);
    xhr.send();
}