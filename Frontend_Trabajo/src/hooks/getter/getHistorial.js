export default function getHistorial (user) {
	
	return new Promise((resolve, reject) => {

		let xhr = new XMLHttpRequest();

		xhr.addEventListener('load', () => {
		});

		xhr.onload = function () {
			if (xhr.status === 200) {
				const datosPartidas = JSON.parse(xhr.response);
				console.log(datosPartidas.partidas);
				resolve(datosPartidas.partidas);
			} else {
				alert(`Se ha producido un error al obtener los datos de partidas pausadas.`);
				reject();
			}
		}
		xhr.open('GET', `http://20.160.173.253:3001/api/jugador/historial/${user}`);
		xhr.send();
	});
}