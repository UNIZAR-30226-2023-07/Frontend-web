export default function acceptFriendRequest (me, sender, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            //alert (`Solicitud de amistad aceptada.`);
            doNext();
        } else {
            alert(`Se ha producido un error al enviar la solicitud de amistad.`);
        }
    }
    xhr.open('POST', `http://20.160.173.253:3001/api/amistad/accept`);
    xhr.send(JSON.stringify({ emisor: me, receptor: sender }));
}