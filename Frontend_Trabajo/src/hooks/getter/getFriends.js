export default function getFriends (user, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datosAmigxs = JSON.parse(xhr.response);
            //console.log(datosAmigxs.amistad);
            localStorage.setItem('amigxs7reinas', JSON.stringify(datosAmigxs.amistad));
            //console.log(localStorage.getItem('amigxs7reinas'));
            doNext();
        } else {
            alert(`Se ha producido un error al obtener los datos de amigos.`);
        }
    }
    xhr.open('GET', `http://13.93.90.135:3001/api/amistad/get/${user}`);
    xhr.send();
}