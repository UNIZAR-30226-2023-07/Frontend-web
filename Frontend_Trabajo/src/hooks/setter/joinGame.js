import getUserForGame from "hooks/getter/getUserForGame";

export default function joinGame (me, clavePartida, doNext, doOnError, amITheHost, addMyself) {

    const doTheRest = (gameType) => {
        let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
        if (addMyself) {
            console.log("ME AÑADO DE NUEVO")
            let meAsPlayer = {codigo: me.codigo, nombre: me.nombre, puntos: me.puntos, foto: me.foto, ptsTorneo: 0};
            if (players == null) players = [meAsPlayer];
            else players.push(meAsPlayer);
        }
        localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
        localStorage.setItem("es_torneo7reinas", gameType === "torneo");
        localStorage.setItem("anfitrion7reinas", JSON.stringify(amITheHost));
        doNext();
    }

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("partida encontrada");
            localStorage.removeItem('jugadorxs7reinas');
            let datos = JSON.parse(xhr.response);
            localStorage.setItem('juego7reinas', clavePartida);
            if (datos.jugadores != null) {
                getUserForGame(datos.jugadores[0], () => {
                    if (datos.jugadores.length > 1)
                        getUserForGame(datos.jugadores[1], () => {
                            if (datos.jugadores.length > 2)
                                getUserForGame(datos.jugadores[2], () => {doTheRest(datos.tipo);});
                            else doTheRest(datos.tipo);
                        });
                    else doTheRest(datos.tipo);
                });
            } else doTheRest(datos.tipo);
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://20.160.173.253:3001/api/partida/join`);
    xhr.send(JSON.stringify({ clave: clavePartida, codigo: me.codigo }));
}