import FigureCardCenter from "./FigureCardCenter.js";

const CenterCardElement = ({ number, symbol, name }) => {
  return (
    <>
      {[...Array(Number(number))].map((_symb, index) => {
        index += 1;
        return (
          <span className={"centerCard" + (number==1?" symbol-bigger":"")} key={index}>
            <span className="center-symbol-sigle">
              {number > 0 && number <= 10 ? symbol : ""}
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