import Slifer from "../assets/img/Imgs_7_Reinas/Slifer_sky_dragon.png";
import As_p from "../assets/img/Imgs_7_Reinas/As_de_picas.png";
import PepoClown from "../assets/img/Imgs_7_Reinas/pepoclown.jpg";
import Bot from "../assets/img/Imgs_7_Reinas/bot.jpg";
import Jaime from "../assets/img/Imgs_7_Reinas/jaime.jpg";
import Lucia from "../assets/img/Imgs_7_Reinas/lucia.jpg";
import Patricia from "../assets/img/Imgs_7_Reinas/patricia.jpg";

const SelectImgUser = (imagen_elegida) => {
    switch (imagen_elegida) {
      case 0:
        return PepoClown;

      case 1:
        return Slifer;
      
      case 2:
        return Bot;
      
      case 3:
        return Jaime;

      case 4:
        return Lucia;

      case 5:
        return Patricia;
      
      default:
        return As_p;
    }
  };
  
export default SelectImgUser;
