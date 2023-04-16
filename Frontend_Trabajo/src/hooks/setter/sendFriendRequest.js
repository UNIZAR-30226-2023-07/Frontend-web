export default function sendFriendRequest (me, another, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            alert (`Solicitud de amistad enviada.`);
            container = JSON.parse(xhr.response);
            doNext();
        } else {
            alert(`Se ha producido un error al enviar la solicitud de amistad.`);
        }
    }
    xhr.open('POST', `http://api/amistad/add`);
    xhr.send(JSON.stringify({ emisor: me, receptor: another }));
}