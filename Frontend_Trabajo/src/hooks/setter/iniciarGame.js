export default function iniciarGame (me, clavePartida, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("partida iniciada");
            const datos = JSON.parse(xhr.response);
            //localStorage.setItem('juego7reinas', datos.clave);

            console.log("Datos de la partida iniciada: "+JSON.stringify(datos));
            doNext();
        } else {
            console.log("Error al iniciar la partida");
        }
    }
    xhr.open('POST', `http://52.174.124.24:3001/api/partida/iniciar`);
    xhr.send(JSON.stringify({ codigo: me, clave: clavePartida.toString(), bot:"no" }));
}