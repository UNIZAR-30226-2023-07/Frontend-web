import "./../assets/css/cartas_rabino.css";
//import Card from "components/Cartas_Rabino/card.js";
import CardsWrapper from "components/Cartas_Rabino/CardWrapper.js";

function App() {
  const cartas_inicio = [
    {
      number: 0,
      symbol: 0,
    },
    {
      number: 12,
      symbol: 2,
    },
    {
      number: 11,
      symbol: 3,
    },
    {
      number: 13,
      symbol: 4,
    },
  ];
  return (
    <div className="App">
      <CardsWrapper cartas = {cartas_inicio} cardsNumber = {cartas_inicio.length} />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;