export default function getDeleteUser (code, doNext) {

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.response);
            console.log("Usuario borrado con éxito");
            doNext();
        } else {
            alert(`Se ha producido un error al eleiminar la cuenta de usuario.`);
        }
    }
    xhr.open('GET', `http://20.160.173.253:3001/api/jugador/del/${code}`);
    xhr.send();

}