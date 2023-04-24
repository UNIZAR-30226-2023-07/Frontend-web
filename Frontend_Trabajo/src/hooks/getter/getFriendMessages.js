export default async function getFriendMessages (user, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        // console.log(xhr.responseText);
        console.log("a");
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            const datosMensajes = JSON.parse(xhr.response);
            //console.log(datosSolicitudes.amistad);
            localStorage.setItem('mensajes7reinas', JSON.stringify(datosMensajes.msg));
            //console.log(localStorage.getItem('solicitudes7reinas'));
            doNext();
        } else {
            alert(`Se ha producido un error al obtener los mensajes.`);
        }
    }
    xhr.open('GET', `http://52.174.124.24:3001/api/msg/get/${user}`);
    xhr.send();
}