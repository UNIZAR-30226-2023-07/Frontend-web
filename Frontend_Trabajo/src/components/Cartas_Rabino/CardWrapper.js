import Card from "./card.js";

import { numbers, colors, symbols } from "../../data";

import { 
  Button
} from "reactstrap";

//import {  colors } from "../../data";
//import useRandomValueFromArray from "../../hooks/useRandomValueFromArray";

const CardsWrapper = ({className, cartas, cardsNumber, accion_Carta, classes}) => {
  const cardNumbers = cardsNumber;
  const carta = cartas;
  let indice = 0;

  return (
    <div className={`card-wrapper ${className}`}>
      {[...Array(Number(cardNumbers))].map((_numb, index) => {
        index += 1;
        
        const carta_Symbols =
        symbols[carta[indice].symbol];
        const carta_Numbers =
        numbers[carta[indice].number];
        const carta_Comb = carta[indice].comb;
        indice = indice + 1;

      return (
        <Button onClick={() => {accion_Carta(Number(index)-1);}} 
        className={classes + (classes !== null ? " ":"") + ` card-button-${carta_Comb}`} /*style={{ backgroundColor: active ? "black" : "white" }}*/ >
        <Card
          key={index}
          name={carta_Symbols.name}
          number={carta_Numbers.number}
          color={colors[0].color}
          suit = {carta_Symbols.id}
          symbol={carta_Symbols.symbol}
        />
        </Button>
      );
      })}
    </div>
  );
};

/*
const CardsWrapper = ({ cardsNumber }) => {
  const cardNumbers = cardsNumber;
  const { randomValueFromArray } = useRandomValueFromArray();

  return (
    <div className="card-wrapper">
      {[...Array(Number(cardNumbers))].map((_numb, index) => {
        index += 1;
        const randomSymbols =
          symbols[Math.floor(Math.random() * symbols.length)];

        return (
          <Card
            key={index}
            name={randomSymbols.name}
            number={randomValueFromArray(numbers).number}
            color={
              randomSymbols.name === "spade" || randomSymbols.name === "club" || randomSymbols.name === "joker"
                ? `${colors[1].color}`
                : `${colors[0].color}`
            }
            symbol={randomSymbols.symbol}
          />
        );
      })}
    </div>
  );
};
*/
export default CardsWrapper;