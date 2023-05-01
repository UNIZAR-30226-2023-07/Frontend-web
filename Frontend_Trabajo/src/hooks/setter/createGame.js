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

            const jPartida = '{"jugadores": ["1"]}';
            const datosJugadores = JSON.parse(jPartida);
            //console.log("DATOS PARTIDA CREADA: "+JSON.stringify(datosJugadores.jugadores));
            localStorage.setItem("jPartida7reinas", JSON.stringify(datosJugadores.jugadores)); //Inicialmnete es vacia
            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://52.174.124.24:3001/api/partida/crear`);
    xhr.send(JSON.stringify({ tipo: tipoPartida, anfitrion: me }));
}