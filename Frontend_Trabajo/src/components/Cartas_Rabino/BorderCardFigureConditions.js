const BorderCardFigureConditions = ({ number }) => {
    if ( number > 0 ) return (
      <p className="card-number" style={{marginBottom:"-0.75rem"}}>
        {number === 11 ? "J" : number === 12 ? "Q" : number === 13 ? "K" : number === 1 ? "A" : number}
      </p>
    );
};
export default BorderCardFigureConditions;