export default function acceptFriendRequest (me, sender, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            alert (`Solicitud de amistad aceptada.`);
            container = JSON.parse(xhr.response);
            doNext();
        } else {
            alert(`Se ha producido un error al enviar la solicitud de amistad.`);
        }
    }
    xhr.open('POST', `http://api/amistad/accept`);
    xhr.send(JSON.stringify({ emisor: me, receptor: sender }));
}