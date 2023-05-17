import getUserForGame from "hooks/getter/getUserForGame";

export default function joinGame (me, clavePartida, doNext, doOnError, amITheHost, addMyself) {

    const doTheRest = (gameType) => {
        let players = JSON.parse(sessionStorage.getItem('jugadorxs7reinas'));
        if (!(players.some(p => p.codigo === me.codigo))) {
            let meAsPlayer = {codigo: me.codigo, nombre: me.nombre, puntos: me.puntos, foto: me.foto, ptsTorneo: 0};
            if (players == null) players = [meAsPlayer];
            else players.push(meAsPlayer);
        }
        sessionStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
        sessionStorage.setItem("es_torneo7reinas", gameType === "torneo");
        sessionStorage.setItem("anfitrion7reinas", JSON.stringify(amITheHost));
        doNext();
    }

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {});

    const anyadirBot = (num) => {
        let players = JSON.parse(sessionStorage.getItem('jugadorxs7reinas'));
        let bot = {
            codigo: `bot${num}`,
            nombre: `Bot ${num}`,
            puntos: 0,
            foto: Math.floor(Math.random() * 9),
            cartas: 14,
            ptsTorneo: 0
        };
        players = players == null ? [bot] : [...players, bot];
        sessionStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
    }

    const obtenerInfoJugadorxs = (jugadores, ind) => {
        let match = (/^bot(\d+)$/).exec(jugadores[ind]);
        if (match) {
            anyadirBot(match[1]);
            if (ind < jugadores.length - 1)
                obtenerInfoJugadorxs(jugadores, ind + 1);
            else doTheRest();
        }
        else getUserForGame(jugadores[ind], () => {
            if (ind < jugadores.length - 1)
                obtenerInfoJugadorxs(jugadores, ind + 1);
            else doTheRest();
        });
    }

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("partida encontrada");
            sessionStorage.removeItem('jugadorxs7reinas');
            let datos = JSON.parse(xhr.response);
            console.log(JSON.parse(xhr.response));
            sessionStorage.setItem('juego7reinas', clavePartida);
            if (datos.jugadores != null) {
                obtenerInfoJugadorxs(datos.jugadores, 0);
            } else doTheRest(datos.tipo);
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://20.160.173.253:3001/api/partida/join`);
    xhr.send(JSON.stringify({ clave: clavePartida, codigo: me.codigo }));
}