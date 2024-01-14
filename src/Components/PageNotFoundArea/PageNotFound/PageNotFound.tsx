import { NavLink, useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="PageNotFound">
      <br />
      <br />
      <br />
      <h1>How Did You Get Here ?</h1>
      <h2>There is no place like home</h2>
      <h3>&#8595;</h3>
      <NavLink to={"/home"}>Home</NavLink>
    </div>
  );
}

export default PageNotFound;
