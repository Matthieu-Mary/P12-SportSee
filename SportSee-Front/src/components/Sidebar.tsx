import Yoga from "../assets/sidebar/yoga.svg"
import Swim from "../assets/sidebar/swimming.svg"
import Bike from "../assets/sidebar/bike.svg"
import Workout from "../assets/sidebar/workout.svg"

/**
 * 
 * @return { ReactElement } return the left Sidebar with navigation
 */

export default function Sidebar() {
  return (
    <div className="sidebar">
        <nav className="sidebar-nav">
            <a href="#">
                <img src={Yoga} alt="yoga" />
            </a>
            <a href="#">
                <img src={Swim} alt="swimming" />
            </a>
            <a href="#">
                <img src={Bike} alt="bike" />
            </a>
            <a href="#">
                <img src={Workout} alt="workout" />
            </a>
        </nav>
        <p>Copiryght, SportSee 2020</p>
    </div>
  )
}