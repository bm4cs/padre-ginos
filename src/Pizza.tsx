interface PizzaProps {
  name: string;
  description: string;
  image: string;
}

const Pizza = (props: PizzaProps): JSX.Element => {
  return (
    <div className="pizza" onClick={() => console.log(`${props.name} clicked`)}>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <img src={props.image} alt={props.name} />
    </div>
  );
};

export default Pizza;
