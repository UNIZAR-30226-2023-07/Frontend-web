export default function getUserByCode (code, container) {

    let xhr = new XMLHttpRequest();
    let datos_user;
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.response);
            datos.pperdidas = datos.pjugadas - datos.pganadas;
            container = datos;
            datos_user = JSON.stringify(datos);
            localStorage.setItem('jGetUser7reinas', JSON.stringify(datos));
        } else {
            alert(`Se ha producido un error al obtener los datos del usuario.`);
        }
    }
    xhr.open('GET', `http://20.160.173.253:3001/api/jugador/get2/${code}`);
    xhr.send();

    return datos_user;
}