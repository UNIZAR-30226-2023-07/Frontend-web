import BorderCardFigureConditions from "./BorderCardFigureConditions.js";
import CenterCardElement from "./CenterCardElement.js";
import Oro from "assets/img/cards/oroColored.png"
import Copa from "assets/img/cards/copaColored.png"
import Espada from "assets/img/cards/espadaColored.png"
import Basto from "assets/img/cards/bastoColored.png"
import Comodin from "assets/img/cards/comodin.png";

const Card = ({ number, color, symbol, suit, name }) => {

  const getSymbol = () => {
    return  number === 0 ? (<img src={Comodin} className="comodin suit-symbol-center suit-symbol suit-symbol-border" style={{marginBottom:"-0.75rem"}} alt="Comodín" />) :
            number <= 0 || number > 13 ? "" :
            suit === 1 ? (<img src={Espada} className="espada suit-symbol-center suit-symbol suit-symbol-border" style={{marginBottom:"-0.75rem"}} alt="Espada" />) :
            suit === 2 ? (<img src={Copa} className="copa suit-symbol-center suit-symbol suit-symbol-border" style={{marginBottom:"-0.75rem"}} alt="Copa" />) :
            suit === 3 ? (<img src={Basto} className="basto suit-symbol-center suit-symbol suit-symbol-border" style={{marginBottom:"-0.75rem"}} alt="Basto" />) :
            suit === 4 ? (<img src={Oro} className="oro suit-symbol-center suit-symbol suit-symbol-border" style={{marginBottom:"-0.75rem"}} alt="Oro" />) : ""};

  return (
    <div className="card-container">
      <div className={`card-content__inner ${name}`}>
        <div className={`card-content-inner__border-top ${color}`}>
          <div className="top-symbol">
            <BorderCardFigureConditions number={number} />
            <span className="top-symbol-sigle">{getSymbol()}</span>
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