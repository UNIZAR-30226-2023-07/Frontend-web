export default function getFriends (user, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        // console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datosSolicitudes = JSON.parse(xhr.response);
            //console.log(datosSolicitudes.amistad);
            sessionStorage.setItem('solicitudes7reinas', JSON.stringify(datosSolicitudes.amistad));
            //console.log(sessionStorage.getItem('solicitudes7reinas'));
            doNext();
        } else {
            alert(`Se ha producido un error al obtener los datos de solicitudes de amistad.`);
        }
    }
    xhr.open('GET', `http://20.160.173.253:3001/api/amistad/get/pendientes/${user}`);
    xhr.send();
}