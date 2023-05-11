import getUserForGame from "hooks/getter/getUserForGame";

export default function joinGame (me, clavePartida, doNext, doOnError, amITheHost) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            localStorage.setItem('juego7reinas', clavePartida);
            localStorage.removeItem('jugadorxs7reinas');
            console.log("partida encontrada");
            let datos = JSON.parse(xhr.response);
            if (datos.jugadores != null) {
                getUserForGame(datos.jugadores[0], () => {
                    if (datos.jugadores.length > 1)
                        getUserForGame(datos.jugadores[1], () => {
                            if (datos.jugadores.length > 2)
                                getUserForGame(datos.jugadores[2], () => {
                                    let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
                                    players.push({codigo: me.codigo, nombre: me.nombre, puntos: me.puntos, foto: me.foto});
                                    localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
                                });
                            else {
                                let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
                                players.push({codigo: me.codigo, nombre: me.nombre, puntos: me.puntos, foto: me.foto});
                                localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
                            }
                        });
                    else {
                        let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
                        players.push({codigo: me.codigo, nombre: me.nombre, puntos: me.puntos, foto: me.foto});
                        localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
                    }
                });
            } else {
                let players = [{codigo: me.codigo, nombre: me.nombre, puntos: me.puntos, foto: me.foto}];
                localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
            }
            if(datos.tipo == "amistosa"){ //Indicamos si es un torneo o no
                localStorage.setItem("es_torneo7reinas", false);
            } else {
                localStorage.setItem("es_torneo7reinas", true);
            }
            localStorage.setItem("anfitrion7reinas", JSON.stringify(amITheHost));
            // let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
            // console.log("Juagador propio ñadido 2");
            // let user = {codigo: me.codigo, nombre: me.nombre, puntos: me.puntos, foto: me.foto};
            // players = players == null ? [user] : [...players, user];

            // localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));


            // // let jugadoresPart = datosJugadores.jugadores;
            // // console.log("Datos de jugadores JOIN:" + JSON.stringify(jugadoresPart));
            // console.log(datos.jugadores);
            // localStorage.setItem("jugadorxs7reinas", JSON.stringify(datos.jugadores)); ////Guarda el código de los jugadores conectados

            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://52.174.124.24:3001/api/partida/join`);
    xhr.send(JSON.stringify({ clave: clavePartida, codigo: me.codigo }));
}