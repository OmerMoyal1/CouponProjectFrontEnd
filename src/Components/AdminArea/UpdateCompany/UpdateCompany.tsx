import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { CouponModel } from "../../../Models/CouponModel";
import AdminService from "../../../Services/AdminService";
import authService from "../../../Services/AuthService";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCompany.css";

function UpdateCompany(): JSX.Element {
  //get one company for the id to return the updated company and to set place holder
  const [company, setCompany] = useState<CompanyModel>();
  const params = useParams();
  const id = +params.id!;
  const { register, handleSubmit, formState } = useForm<CompanyModel>();
  const navigate = useNavigate();
  const date = new Date();
  const change = false;
  const name = company?.name;
  var md5 = require("md5");

  useEffect(() => {
    new AdminService()
      .getOneCompany(id)
      .then((c) => setCompany(c))
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          console.log(err);
          authService.logout();
          navigate("/login");
        }
      });
  }, []);
  // send the company for update after hashing the password and setting the id to the  id of the company from the getOneCompany
  function send(companyUpdated: CompanyModel) {
    companyUpdated.password = md5(companyUpdated.password);
    companyUpdated.id = id;
    companyUpdated.name = name;

    new AdminService()
      .updateCompany(companyUpdated)
      .then(() => {
        // notify success
        notificationService.success("Company updated!");
        navigate("/admin");
      })
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }

  return (
    <div className="UpdateCompany">
      <h2>Update Company :</h2>
      <form onSubmit={handleSubmit(send)}>
        <label>Company ID: </label>
        <input
          disabled={true}
          value={company?.id + ""}
          type="number"
          id="price"
          {...register("id", {
            min: { value: 0, message: "ID cannot be negative!" },
          })}
        />
        <br />
        <br />

        <label>Name: </label>
        <input
          value={company?.name}
          disabled={true}
          type="text"
          id="name"
          {...register("name")}
        />
        <br />
        <span className="error">{formState.errors?.name?.message}</span>
        <br />

        <label>Email : </label>
        <input
          placeholder={company?.email}
          type="email"
          id="email"
          {...register("email", {
            required: { value: true, message: "Email required!" },
            minLength: {
              value: 4,
              message: "Email must be at least 4 chars long",
            },
          })}
        />
        <br />
        <span className="error">{formState.errors?.email?.message}</span>
        <br />

        <label>Password: </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: { value: true, message: "password required!" },
            minLength: {
              value: 4,
              message: "password must be at least 4 chars long",
            },
          })}
        />
        <br />
        <span className="error">{formState.errors?.password?.message}</span>

        <br />
        <button className="btn">Edit</button>
      </form>
    </div>
  );
}

export default UpdateCompany;
