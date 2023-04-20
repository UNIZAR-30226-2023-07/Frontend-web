import "./../assets/css/cartas_rabino.css";
//import Card from "components/Cartas_Rabino/card.js";
import CardsWrapper from "components/Cartas_Rabino/CardWrapper.js";

function App() {
  const cartas_mano = [
    {
      number: 0, //JOKER
      symbol: 0,
    },
    {
      number: 12, //Q
      symbol: 2,
    },
    {
      number: 11, //J
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    },
  ];

  const CSelecion= [];

  const t = [
    [{
      number: 0, //JOKER
      symbol: 0,
    },
    {
      number: 11, //JOKER
      symbol: 1,
    },
    {
      number: 11, //JOKER
      symbol: 2,
    }
    ],
    [{
      number: 11, //Q
      symbol: 3,
    },
    {
      number: 11, //Q
      symbol: 4,
    },
    {
      number: 12, //Q
      symbol: 1,
    }
    ],
    [{
      number: 12, //J
      symbol: 2,
    },
    {
      number: 12, //J
      symbol: 3,
    },
    {
      number: 12, //J
      symbol: 4,
    },
    ],
    [{
      number: 13, //K
      symbol: 1,
    },
    {
      number: 13, //K
      symbol: 2,
    },
    {
      number: 13, //K
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    }
    ]
  ];
  return (
    <div className="App">
      {t.map((fila, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
          <CardsWrapper cartas={fila} cardsNumber={fila.length} />
        </div>
      ))}
      <CardsWrapper cartas = {cartas_mano} cardsNumber = {cartas_mano.length} />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;