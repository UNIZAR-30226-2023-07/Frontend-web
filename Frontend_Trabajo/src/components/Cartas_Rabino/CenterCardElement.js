import FigureCardCenter from "./FigureCardCenter.js";
import Oro from "assets/img/cards/oroColored.png"
import Copa from "assets/img/cards/copaColored.png"
import Espada from "assets/img/cards/espadaColored.png"
import Basto from "assets/img/cards/bastoColored.png"

const CenterCardElement = ({ number, symbol, suit, name }) => {
  return (
    <>
      {[...Array(Number(number))].map((_symb, index) => {
        index += 1;
        return (
          <span className={"centerCard" + (number==1?" symbol-bigger":"")} key={index}>
            <span className="center-symbol-sigle">
              {number <= 0 || number > 10 ? "" : 
                suit === 1 ? (<img src={Espada} className="espada suit-symbol-center suit-symbol" alt="Espada" />) :
                suit === 2 ? (<img src={Copa} className="copa suit-symbol-center suit-symbol" alt="Copa" />) :
                suit === 3 ? (<img src={Basto} className="basto suit-symbol-center suit-symbol" alt="Basto" />) :
                suit === 4 ? (<img src={Oro} className="oro suit-symbol-center suit-symbol" alt="Oro" />) : ""}
            </span>
          </span>
        );
      })}
      {number === 11 || number === 12 || number === 13 || number === 0? (
        <FigureCardCenter number={number} name={name} />
      ) : (
        ""
      )}
    </>
  );
};

export default CenterCardElement;