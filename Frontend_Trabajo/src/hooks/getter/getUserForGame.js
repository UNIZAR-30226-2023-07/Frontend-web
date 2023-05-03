export default function getUserForGame (player, doNext) {

    console.log (`http://52.174.124.24:3001/api/jugador/get2/${player}`);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.response);
            let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
            players.push({codigo: datos.codigo, nombre: datos.nombre, puntos: datos.puntos, foto: datos.foto});
            localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
            doNext();
        } else {
            alert(`Se ha producido un error al obtener los datos del jugador.`);
        }
    }
    xhr.open('GET', `http://52.174.124.24:3001/api/jugador/get2/${player}`);
    xhr.send();

}