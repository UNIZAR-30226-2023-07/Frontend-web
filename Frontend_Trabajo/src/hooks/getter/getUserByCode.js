export default function getUserByCode (code) {

    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            //console.log(xhr.responseText);
        });

        xhr.onload = function () {
            if (xhr.status === 200) {
                const datos = JSON.parse(xhr.response);
                datos.pperdidas = datos.pjugadas - datos.pganadas;
                console.log(datos);
                resolve(datos);
            } else {
                alert(`Se ha producido un error al obtener los datos del usuario.`);
                reject();
            }
        }
        xhr.open('GET', `http://20.160.173.253:3001/api/jugador/get2/${code}`);
        xhr.send();
    });
}