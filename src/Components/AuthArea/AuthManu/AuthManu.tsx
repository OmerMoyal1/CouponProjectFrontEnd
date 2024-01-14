import { Button } from "@mui/material";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./AuthManu.css";

function AuthMenu(): JSX.Element {
  const navigate = useNavigate();

  function logout() {
    authService.logout();
    notificationService.success("Bye bye");
    navigate("/login");
  }

  return (
    <div className="AuthMenu">
      {!authStore.getState().token && (
        <>
          <NavLink to="/register">Register</NavLink>{" "}
          <span>
            <b>|&nbsp;</b>
          </span>
          <NavLink to="/login">Login</NavLink>
        </>
      )}

      {authStore.getState().token && (
        <>
          <span>
            Hello <br />
            <br />
            {authStore.getState().user.name}{" "}
          </span>
          <br />
          <br />
          <Button variant="outlined" color="secondary" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
