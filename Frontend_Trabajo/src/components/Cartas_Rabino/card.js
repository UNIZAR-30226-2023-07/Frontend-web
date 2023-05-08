import BorderCardFigureConditions from "./BorderCardFigureConditions.js";
import CenterCardElement from "./CenterCardElement.js";
import Oro from "assets/img/palos/oroColored.png"
import Copa from "assets/img/palos/copaColored.png"
import Espada from "assets/img/palos/espadaColored.png"
import Basto from "assets/img/palos/bastoColored.png"

const Card = ({ number, color, symbol, suit, name }) => {

  const getSymbol = (suit) => { return number <= 0 || number > 10 ? "" : 
    suit === 1 ? (<img src={Espada} className="espada suit-symbol-center suit-symbol" alt="Espada" />) :
    suit === 2 ? (<img src={Copa} className="copa suit-symbol-center suit-symbol" alt="Copa" />) :
    suit === 3 ? (<img src={Basto} className="basto suit-symbol-center suit-symbol" alt="Basto" />) :
    suit === 4 ? (<img src={Oro} className="oro suit-symbol-center suit-symbol" alt="Oro" />) : ""};

  return (
    <div className="card-container">
      <div className={`card-content__inner ${name}`}>
        <div className={`card-content-inner__border-top ${color}`}>
          <div className="top-symbol">
            <BorderCardFigureConditions number={number} />
            <span className="top-symbol-sigle">{getSymbol(suit)}</span>
          </div>
          <div />
        </div>
        <div className={`card-content-inner__center grid-${number} ${color}`}>
          <CenterCardElement number={number} symbol={symbol} suit={suit} name={name} />
        </div>
        <div className={`card-content-inner__border-bottom ${color}`}>
          <div />
          <div className="bottom-symbol ">
            <span className="bottom-symbol-sigle">{getSymbol(suit)}</span>
            <BorderCardFigureConditions number={number} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;