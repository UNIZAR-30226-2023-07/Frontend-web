export default function sendFriendRequest (me, another, doNext, ifFailed) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            doNext();
        } else {
            ifFailed();
        }
    }
    xhr.open('POST', `http://20.160.173.253:3001/api/amistad/add`);
    xhr.send(JSON.stringify({ emisor: me, receptor: another }));
}