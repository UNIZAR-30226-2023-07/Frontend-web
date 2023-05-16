export default function markAsSeen (messages, amigx) {
    if (messages !== null) {
        return messages.map((mensaje) => {
            if (mensaje.Emisor === amigx)
                mensaje.Leido = 1;
            return mensaje;
        });
    }
}