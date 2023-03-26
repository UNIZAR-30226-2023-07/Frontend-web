const BorderCardFigureConditions = ({ number }) => {
    return (
      <p>
        {number === 11 ? "J" : number === 12 ? "Q" : number === 13 ? "K" : number === 0 ? "JOKER" : number === 1 ? "A" : number}
      </p>
    );
};
export default BorderCardFigureConditions;