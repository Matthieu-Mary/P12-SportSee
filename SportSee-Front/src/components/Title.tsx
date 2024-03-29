
/**
 * TItle component
 * 
 * @return { ReactComponent } return a component for title containing the name of the user actually connected
 */

type Props = {
  userName: string
};

export default function Title({userName}: Props) {

  return (
    <div className="titles">
      <h1>
        Bonjour <span>{userName}</span>
      </h1>
      <h4>Félicitation ! Vous avez explosé vos objectifs hier 👏</h4>
    </div>
  );
}
