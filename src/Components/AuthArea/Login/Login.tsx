import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserDetailsModel } from "../../../Models/UserDetailsModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import AuthService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<UserDetailsModel>();
  const navigate = useNavigate();
  var md5 = require("md5");

  function send(user: UserDetailsModel) {
    user.password = md5(user.password);
    authService
      .login(user)
      .then(() => {
        notificationService.success("Logged in Succeesfuly");
        switch (user.clientType) {
          case "ADMINISTRATOR":
            navigate("/admin");
            break;
          case "COMPANY":
            navigate("/company");
            break;
          case "CUSTOMER":
            navigate("/customer");
            break;
        }
      })
      .catch((err) =>
        //alert(err.response.data)
        notificationService.error(err)
      );
  }

  return (
    <div className="Login">
      <h2>Login :</h2>
      <form onSubmit={handleSubmit(send)}>
        <br />

        <h3>Email :</h3>
        <input {...register("email")} placeholder="email" />
        <br />

        <h3>Password :</h3>
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <br />
        <br />
        <label htmlFor="type">Choose the client type : </label>
        <select id="clientTypes" {...register("clientType")}>
          {" "}
          <option value="ADMINISTRATOR">Adminstrator</option>
          <option value="COMPANY">Company</option>
          <option value="CUSTOMER">Customer</option>
        </select>
        <br />
        <br />
        <br />
        <br />
        <button className="btn">login</button>
      </form>
    </div>
  );
}

export default Login;
