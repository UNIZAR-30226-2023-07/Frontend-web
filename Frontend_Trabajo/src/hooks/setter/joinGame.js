import getUserForGame from "hooks/getter/getUserForGame";

export default function joinGame (me, clavePartida, doNext, doOnError) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            localStorage.setItem('juego7reinas', clavePartida);
            console.log("partida encontrada");
            const datos = JSON.parse(xhr.response);
            datos = datos.jugadores.forEach(jugador => {
                getUserForGame(jugador);
            });
            // let jugadoresPart = datosJugadores.jugadores;
            // console.log("Datos de jugadores JOIN:" + JSON.stringify(jugadoresPart));
            console.log(datos.jugadores);
            localStorage.setItem("jugadorxs7reinas", JSON.stringify(datos.jugadores)); ////Guarda el código de los jugadores conectados
            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://52.174.124.24:3001/api/partida/join`);
    xhr.send(JSON.stringify({ clave: clavePartida, codigo: me }));
}