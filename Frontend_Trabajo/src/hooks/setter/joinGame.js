export default function joinGame (me, clavePartida, doNext, doOnError) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("partida encontrada");
            const datos = JSON.parse(xhr.response);
            localStorage.setItem('juego7reinas', clavePartida);
            doNext();
        } else {
            doOnError();
        }
    }
    xhr.open('POST', `http://52.166.36.105:3001/api/partida/join`);
    xhr.send(JSON.stringify({ clave: clavePartida, codigo: me }));
}