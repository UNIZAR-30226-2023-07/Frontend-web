import Slifer from "../assets/img/Imgs_7_Reinas/Slifer_sky_dragon.png";
import Ficha_R from "../assets/img/Imgs_7_Reinas/Ficha_de_rabino.png";
import Juego from "../assets/img/Imgs_7_Reinas/Fondo_Pantalla_Inicio.png";
import As_p from "../assets/img/Imgs_7_Reinas/As_de_picas.png";

const SelectImgUser = (imagen_elegida) => {
    switch (imagen_elegida) {
      case 1:
        return Slifer;
      
      case 2:
        return Ficha_R;
      
      case 3:
        return Juego;

      default:
        return As_p;
    }
  };
  
export default SelectImgUser;
