import getUserForGame from "hooks/getter/getUserForGame";

export default function pauseGame (me, clavePartida, doNext, doOnError) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Éxito, debería sacar a todxs lxs jugadorxs de la partida.");
            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://52.174.124.24:3001/api/partida/pausar`);
    xhr.send(JSON.stringify({ clave: clavePartida, codigo: me.codigo }));
}