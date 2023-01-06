import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Card from "./Card";

const animeArray = [
  { src: "./assets/killua.png", matched: false },
  { src: "./assets/ldn.png", matched: false },
  { src: "./assets/luffy.png", matched: false },
  { src: "./assets/makima.png", matched: false },
  { src: "./assets/power.png", matched: false },
  { src: "./assets/yor.png", matched: false },
];
function App() {
  // states
  const [animeCards, setAnimeCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // shuffle array and add id
  function shuffleArray() {
    const shuffledAnimeArray = [...animeArray, ...animeArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: nanoid() }));

    setAnimeCards(shuffledAnimeArray);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  // function  handleChoice to set choice
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // function to evaluate choice using useEffect(everytime change in choice)
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setAnimeCards((prevCards) => {
          return prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          );
        });
        setTimeout(() => resetChoice(), 1000);
      } else {
        setTimeout(() => resetChoice(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // function to reset choices
  function resetChoice() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  }
  return (
    <div className="App">
      <h1>Anime Memory</h1>
      <button onClick={shuffleArray}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="cards--grid">
        {animeCards.map((card) => (
          <Card
            src={card.src}
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
