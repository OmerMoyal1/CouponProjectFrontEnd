import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import CustomerModel from "../../../Models/CustomerModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./RegisterCompany.css";

function RegisterCompany(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CompanyModel>();
  const navigate = useNavigate();

  var md5 = require("md5");

  function send(user: CompanyModel) {
    user.password = md5(user.password);
    authService
      .registerCompany(user)
      .then(() => {
        notificationService.success("Registered successfully!");
        navigate("/login");
      })
      .catch((err) => notificationService.error(err));
  }

  return (
    <div className="Register box">
      <h2>Register Company : </h2>
      <br />
      <form onSubmit={handleSubmit(send)}>
        <label>Company Name:</label>
        <input
          {...register("name", {
            required: { value: true, message: "First name required!" },
            minLength: {
              value: 3,
              message: "First name must be at least 3 chars long",
            },
          })}
        />{" "}
        <br />
        <span>{formState.errors?.name?.message}</span>
        <br />
        {/* <label>Last Name:</label>
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
        <br /> */}
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
        <button className="btn">Register</button>
      </form>
    </div>
  );
}

export default RegisterCompany;
