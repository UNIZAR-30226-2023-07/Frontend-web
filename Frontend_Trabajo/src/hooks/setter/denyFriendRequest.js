export default function denyFriendRequest (me, sender, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            //alert (`Solicitud de amistad rechazada.`);
            doNext();
        } else {
            alert(`Se ha producido un error al enviar la solicitud de amistad.`);
        }
    }
    xhr.open('POST', `http://52.166.36.105:3001/api/amistad/deny`);
    xhr.send(JSON.stringify({ emisor: me, receptor: sender }));
}