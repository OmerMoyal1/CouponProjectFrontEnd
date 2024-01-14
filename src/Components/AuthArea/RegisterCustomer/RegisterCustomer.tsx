import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";

import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";

function RegisterCustomer(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CustomerModel>();
  const navigate = useNavigate();
  var md5 = require("md5");

  function send(user: CustomerModel) {
    user.password = md5(user.password);
    authService
      .registerCustomer(user)
      .then(() => {
        notificationService.success("Registered successfully!");
        navigate("/login");
      })
      .catch((err) => notificationService.error(err));
  }

  return (
    <div className="Register box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Register Customer :</h2>
        <br />
        <label>First Name:</label>
        <input
          {...register("firstName", {
            required: { value: true, message: "First name required!" },
            minLength: {
              value: 3,
              message: "First name must be at least 3 chars long",
            },
          })}
        />{" "}
        <br />
        <span>{formState.errors?.firstName?.message}</span>
        <br />
        <label>Last Name:</label>
        <input
          {...register("lastName", {
            required: { value: true, message: "Last name required!" },
            minLength: {
              value: 3,
              message: "Last name must be at least 3 chars long",
            },
          })}
        />{" "}
        <br />
        <span>{formState.errors?.lastName?.message}</span>
        <br />
        <label>Email:</label>
        <input
          {...register("email", {
            required: { value: true, message: "Email required!" },
            minLength: {
              value: 4,
              message: "Email must be at least 4 chars long",
            },
          })}
        />{" "}
        <br />
        <span>{formState.errors?.email?.message}</span>
        <br />
        <label>Password:</label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "password required!" },
            minLength: {
              value: 4,
              message: "password must be at least 4 chars long",
            },
          })}
        />{" "}
        <br />
        <span>{formState.errors?.password?.message}</span>
        <br />
        <br />
        <br />
        <button className="btn">Register</button>
      </form>
    </div>
  );
}

export default RegisterCustomer;
