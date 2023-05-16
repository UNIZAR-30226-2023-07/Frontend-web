import OrosSota from "assets/img/cards/orosSota.png";
import OrosCaballo from "assets/img/cards/orosCaballo.png";
import OrosRey from "assets/img/cards/orosRey.png";
import CopasSota from "assets/img/cards/copasSota.png";
import CopasCaballo from "assets/img/cards/copasCaballo.png";
import CopasRey from "assets/img/cards/copasRey.png";
import EspadasSota from "assets/img/cards/espadasSota.png";
import EspadasCaballo from "assets/img/cards/espadasCaballo.png";
import EspadasRey from "assets/img/cards/espadasRey.png";
import BastosSota from "assets/img/cards/bastosSota.png";
import BastosCaballo from "assets/img/cards/bastosCaballo.png";
import BastosRey from "assets/img/cards/bastosRey.png";
import Comodin from "assets/img/cards/comodinFigura.png";

const FigureCardCenter = ({ name, number }) => {
  const FigureContent = () => {
    switch (number) {
      case 11:
        if (name === "espadas") {
          return <img
            alt="..."
            className="img card-figure"
            src={EspadasSota}
          />;
        }
        if (name === "copas") {
          return <img
            alt="..."
            className="img card-figure"
            src={CopasSota}
          />;
        }
        if (name === "bastos") {
          return <img
            alt="..."
            className="img card-figure"
            src={BastosSota}
          />;
        }
        if (name === "oros") {
          return <img
            alt="..."
            className="img card-figure"
            src={OrosSota}
          />;
        }
        break;
      case 12:
        if (name === "espadas") {
          return <img
            alt="..."
            className="img card-figure"
            src={EspadasCaballo}
          />;
        }
        if (name === "copas") {
          return <img
            alt="..."
            className="img card-figure"
            src={CopasCaballo}
          />;
        }
        if (name === "bastos") {
          return <img
            alt="..."
            className="img card-figure"
            src={BastosCaballo}
          />;
        }
        if (name === "oros") {
          return <img
            alt="..."
            className="img card-figure"
            src={OrosCaballo}
          />;
        }
        break;
      case 13:
        if (name === "espadas") {
          return <img
            alt="..."
            className="img card-figure"
            src={EspadasRey}
          />;
        }
        if (name === "copas") {
          return <img
            alt="..."
            className="img card-figure"
            src={CopasRey}
          />;
        }
        if (name === "bastos") {
          return <img
            alt="..."
            className="img card-figure"
            src={BastosRey}
          />;
        }
        if (name === "oros") {
          return <img
            alt="..."
            className="img card-figure"
            src={OrosRey}
          />;
        }
        break;
      case 0:
        return <img
          alt="..."
          className="img card-figure"
          src={Comodin}
        />;
    
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