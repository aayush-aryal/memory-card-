const Card = (props) => {
  return (
    <div className="card--container">
      <div className={props.flipped ? "flipped" : ""}>
        <img src={`${props.src}`} alt="front image" className="front" />
        <img
          src="./assets/back.png"
          alt="back image"
          className="back"
          onClick={() => props.handleChoice(props.card)}
        />
      </div>
    </div>
  );
};

export default Card;
