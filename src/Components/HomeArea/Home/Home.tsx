import { authStore } from "../../../Redux/AuthState";
import Coupons from "../Coupons/Coupons";
import Login from "../../AuthArea/Login/Login";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <h2>Coupons :</h2>
      <Coupons />
    </div>
  );
}

export default Home;
