import { NavLink } from "react-router-dom";
import { AuthState } from "../../../Redux/AuthState";
import AuthManu from "../../AuthArea/AuthManu/AuthManu";
import Login from "../../AuthArea/Login/Login";
import "./Heading.css";

function Heading(): JSX.Element {
  return (
    <div className="Heading">
      <div className="authManu">
        <br />
        <AuthManu />
      </div>

      <h1>C O U P O N I A D A</h1>
    </div>
  );
}

export default Heading;
