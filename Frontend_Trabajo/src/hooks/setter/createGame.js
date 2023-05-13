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
            let jugadorxs = [{
                codigo: me.codigo,
                nombre: me.nombre,
                puntos: me.puntos,
                foto: me.foto,
                ptsTorneo: 0
            }];
            localStorage.setItem("jugadorxs7reinas", JSON.stringify(jugadorxs));
            localStorage.setItem("es_torneo7reinas", tipoPartida === "torneo");
            localStorage.setItem("anfitrion7reinas", JSON.stringify(true));
            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://13.93.90.135:3001/api/partida/crear`);
    xhr.send(JSON.stringify({ tipo: tipoPartida, anfitrion: me.codigo }));
}