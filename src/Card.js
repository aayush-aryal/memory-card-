const Card = (props) => {
  // perform function from prop only when not disabled
  function handleDisabledandChoice() {
    if (!props.disabled) {
      props.handleChoice(props.card);
    }
  }
  return (
    <div className="card--container">
      <div className={props.flipped ? "flipped" : ""}>
        <img src={`${props.src}`} alt="front image" className="front" />
        <img
          src="./assets/back.png"
          alt="back image"
          className="back"
          onClick={handleDisabledandChoice}
        />
      </div>
    </div>
  );
};

export default Card;
