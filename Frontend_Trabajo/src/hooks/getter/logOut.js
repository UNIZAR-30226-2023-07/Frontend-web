export default function logOut () {
    localStorage.setItem('sessionUser', null);
    localStorage.setItem('amigxs7reinas', null);
    localStorage.setItem('solicitudes7reinas', null);
    localStorage.setItem('code_partida_actual', null);
}