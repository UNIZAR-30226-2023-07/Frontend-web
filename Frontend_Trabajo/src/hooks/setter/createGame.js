export default function createGame (me, tipoPartida, doNext, doOnError) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("partida creada");
            const datos = JSON.parse(xhr.response);
            localStorage.setItem('juego7reinas', datos.clave);
            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://52.166.36.105:3001/api/partida/crear`);
    xhr.send(JSON.stringify({ tipo: tipoPartida, anfitrion: me }));
}