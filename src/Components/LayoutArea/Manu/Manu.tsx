import { Button } from "@mui/material";
import { type } from "os";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import "./Manu.css";

function Manu(): JSX.Element {
  const [type, setType] = useState<string>();

  authStore.subscribe(() => {
    if (authStore.getState().user.clientType.toString != null) {
      setType(authStore.getState().user.clientType.toString());
    } else {
      setType("GUEST");
    }
  });

  return (
    <div className="Manu">
      <br />
      <br />
      {type == "CUSTOMER" && (
        <>
          <NavLink to="/home"> Home </NavLink>
        </>
      )}

      {authStore.getState().user.clientType == "GUEST" && (
        <>
          <NavLink to="/home"> Home </NavLink>
        </>
      )}
      {/* <NavLink to="/home"> Home </NavLink> */}
      {type == "ADMINISTRATOR" && (
        <>
          <NavLink to="/admin"> Admin </NavLink>
        </>
      )}
      {type == "COMPANY" && (
        <>
          <NavLink to="/company"> Comapny </NavLink>
        </>
      )}

      {type == "CUSTOMER" && (
        <>
          <NavLink to="/customer"> Customer </NavLink>
        </>
      )}
      <NavLink to="/aboutus"> AboutUs </NavLink>
      {/* <NavLink to="/login"> login </NavLink> */}
    </div>
  );
}

export default Manu;
