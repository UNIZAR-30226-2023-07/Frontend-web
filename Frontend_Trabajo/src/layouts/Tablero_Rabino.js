import "./../assets/css/cartas_rabino.css";
//import Card from "components/Cartas_Rabino/card.js";
import CardsWrapper from "components/Cartas_Rabino/CardWrapper.js";

function App() {
  return (
    <div className="App">
      <CardsWrapper cardsNumber="14"/>
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;