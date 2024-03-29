export default function getPausedGames (user, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datosPartidas = JSON.parse(xhr.response);
            console.log("Datos Partidas Pausadas: "+ datosPartidas.partidas);
            sessionStorage.setItem('part_pausadas7reinas', JSON.stringify(datosPartidas.partidas));
            //console.log(sessionStorage.getItem('amigxs7reinas'));
            doNext();
        } else {
            alert(`Se ha producido un error al obtener los datos de partidas pausadas.`);
        }
    }
    xhr.open('GET', `http://20.160.173.253:3001/api/partidas/pausadas/get/${user}`);
    xhr.send();
}