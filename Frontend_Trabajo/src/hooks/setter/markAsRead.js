export default function markAsRead (me, sender, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            doNext();
        } else {
            alert(`Se ha producido un error al marcar los mensajes como leídos.`);
        }
    }
    xhr.open('POST', `http://52.174.124.24:3001/api/msg/leer`);
    xhr.send(JSON.stringify({ "emisor": sender, "receptor": me }));
}