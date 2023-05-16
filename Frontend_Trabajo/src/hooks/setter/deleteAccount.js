import encryptPassword from '../../hooks/encryptPassword';

export default function deleteAccount (user, email, password, doNext) {

    let encryptedPassword = encryptPassword(password);

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        //console.log(xhr.responseText);
    });

    xhr.onload = function () {
        if (xhr.status === 202) {
            let xhr2 = new XMLHttpRequest();

            xhr2.addEventListener('load', () => {});

            xhr2.onload = function () {
                if (xhr2.status === 200) {
                    alert(`Cuenta eliminada correctamente.`);
                    doNext();
                } else {
                    alert(`Se ha producido un error al eliminar la cuenta.`);
                }
            }
            xhr2.open('GET', `http://20.160.173.253:3001/api/jugador/del/${user}`);
            xhr2.send();
        } else {
            alert(`Se ha introducido mal la contraseña.`);
        }
    }
    xhr.open('POST', `http://20.160.173.253:3001/api/auth/login`);
    xhr.send(JSON.stringify({ email: email, contra: encryptedPassword }));

}