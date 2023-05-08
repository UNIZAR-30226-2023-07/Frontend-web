import JackOfClub from "../figureComponents/JackOfClub";
import JackOfDiamond from "../figureComponents/JackOfDiamond";
import JackOfHeart from "../figureComponents/JackOfHeart";
import JackOfSpade from "../figureComponents/JackOfSpade";
import KingOfClub from "../figureComponents/KingOfClub";
import KingOfDiamond from "../figureComponents/KingOfDiamond";
import KingOfHeart from "../figureComponents/KingOfHeart";
import KingOfSpade from "../figureComponents/KingOfSpade";
import QueenOfClub from "../figureComponents/QueenOfClub";
import QuennOfDiamond from "../figureComponents/QueenOfDiamond";
import QueenOfHeart from "../figureComponents/QueenOfHeart";
import QueenOfSpade from "../figureComponents/QueenOfSpade";
//NUEVO
import Joker from "../figureComponents/Joker_rabino";

const FigureCardCenter = ({ name, number }) => {
  const FigureContent = () => {
    switch (number) {
      case 11:
        if (name === "espadas") {
          return <JackOfSpade />;
        }
        if (name === "copas") {
          return <JackOfClub />;
        }
        if (name === "bastos") {
          return <JackOfHeart />;
        }
        if (name === "oros") {
          return <JackOfDiamond />;
        }
        break;
      case 12:
        if (name === "espadas") {
          return <QueenOfSpade />;
        }
        if (name === "copas") {
          return <QueenOfClub />;
        }
        if (name === "bastos") {
          return <QueenOfHeart />;
        }
        if (name === "oros") {
          return <QuennOfDiamond />;
        }
        break;
      case 13:
        if (name === "espadas") {
          return <KingOfSpade />;
        }
        if (name === "copas") {
          return <KingOfClub />;
        }
        if (name === "bastos") {
          return <KingOfHeart />;
        }
        if (name === "oros") {
          return <KingOfDiamond />;
        }
        break;
      case 0:
        return <Joker />;
    
      default:
        break;
    }
  };

  return (
    <div className="figure-picture">
      <FigureContent />
    </div>
  );
};

export default FigureCardCenter;