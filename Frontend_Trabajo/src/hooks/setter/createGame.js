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
            sessionStorage.setItem('juego7reinas', datos.clave);
            let jugadorxs = [{
                codigo: me.codigo,
                nombre: me.nombre,
                puntos: me.puntos,
                foto: me.foto,
                ptsTorneo: 0
            }];
            sessionStorage.setItem("jugadorxs7reinas", JSON.stringify(jugadorxs));
            sessionStorage.setItem("es_torneo7reinas", tipoPartida === "torneo");
            sessionStorage.setItem("anfitrion7reinas", JSON.stringify(true));
            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://20.160.173.253:3001/api/partida/crear`);
    xhr.send(JSON.stringify({ tipo: tipoPartida, anfitrion: me.codigo }));
}