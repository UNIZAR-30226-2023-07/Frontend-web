export default function unfriend (me, another, doNext) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        // console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            //alert (`Se ha eliminado la amistad.`);
            doNext();
        } else {
            alert(`Se ha producido un error al enviar la solicitud de amistad.`);
        }
    }
    xhr.open('POST', `http://13.93.90.135:3001/api/amistad/remove`);
    xhr.send(JSON.stringify({ emisor: me, receptor: another }));
}