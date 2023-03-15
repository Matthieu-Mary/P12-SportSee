import { ReactElement } from "react";
import Fire from "../assets/infos/Fire.svg"
import Protein from "../assets/infos/Protein.svg"
import Apple from "../assets/infos/apple.svg"
import Cheeseburger from "../assets/infos/cheeseburger.svg"
import { USER_MAIN_DATA } from "../mocks/InfosMock";

/**
 * User Infos component
 * 
 * @param {"calorieCount", "proteinCount", "carbohydrateCount", "lipidCount"} //datas key names 
 * @param {number}  //datas type
 * @return { ReactElement } return a container div with all the user's informations and associated icons
 */


type Props = {
  userInfos: {
    keyData: {
      calorieCount: number,
      proteinCount: number,
      carbohydrateCount: number,
      lipidCount: number
    }
  }
}

function Infos({userInfos}: Props) {

  const data = userInfos ?? USER_MAIN_DATA[0]
  
  const userInfosDiv = data.keyData

  const {calorieCount, proteinCount, carbohydrateCount, lipidCount} = userInfosDiv;

  return (
    <div className="infos-container">
      <div className="info">
        <div className="info-image" style={{background: "rgba(255, 0, 0, 0.07)"}} >
          <img src={Fire} alt="fire logo"  />
        </div>
        <div className="info-name">
          <p>{calorieCount+"Kcal"}</p>
          <span>Calories</span>
        </div>
      </div>
      <div className="info">
        <div className="info-image" style={{background: "rgba(74, 184, 255, 0.1)"}}>
          <img src={Protein} alt="protein logo" />
        </div>
        <div className="info-name">
          <p>{proteinCount+"g"}</p>
          <span>Proteines</span>
        </div>
      </div>
      <div className="info">
        <div className="info-image" style={{background: "rgba(249, 206, 35, 0.1)"}}>
          <img src={Apple} alt="apple logo" />
        </div>
        <div className="info-name">
          <p>{carbohydrateCount+"g"}</p>
          <span>Glucides</span>
        </div>
      </div>
      <div className="info">
        <div className="info-image" style={{background: "rgba(253, 81, 129, 0.1)"}}>
          <img src={Cheeseburger} alt="cheeseburger logo" />
        </div>
        <div className="info-name">
          <p>{lipidCount+"g"}</p>
          <span>Lipides</span>
        </div>
      </div>
    </div>
  )
}

export default Infos