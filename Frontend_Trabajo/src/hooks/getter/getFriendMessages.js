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
            sessionStorage.setItem('mensajes7reinas', JSON.stringify(datosMensajes.msg));
            //console.log(sessionStorage.getItem('solicitudes7reinas'));
            doNext();
        } else {
            alert(`Se ha producido un error al obtener los mensajes.`);
        }
    }
    xhr.open('GET', `http://20.160.173.253:3001/api/msg/get/${user}`);
    xhr.send();
}