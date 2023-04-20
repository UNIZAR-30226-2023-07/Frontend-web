export default function getUserByCode (code, container) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.response);
            datos.pperdidas = datos.pjugadas - datos.pganadas;
            container = datos;
        } else {
            alert(`Se ha producido un error al obtener los datos del usuario.`);
        }
    }
    xhr.open('GET', `http://52.174.124.24:3001/api/jugador/get2/${code}`);
    xhr.send();
}