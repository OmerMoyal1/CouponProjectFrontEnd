import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import AdminService from "../../../Services/AdminService";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {
  //get one customer for the id to return the updated customer and to set place holder
  const [customer, setCustomer] = useState<CustomerModel>();
  const params = useParams();
  const id = +params.id!;
  const { register, handleSubmit, formState } = useForm<CustomerModel>();
  const navigate = useNavigate();

  var md5 = require("md5");

  useEffect(() => {
    new AdminService()
      .getOneCustomer(id)
      .then((c) => setCustomer(c))
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }, []);
  // send the customer for update after hashing the password and setting the id to the  id of the customer from the getOneCustomer

  function send(customerUpdated: CustomerModel) {
    customerUpdated.password = md5(customerUpdated.password);
    customerUpdated.id = id;
    // customerUpdated.firstName = customer?.firstName;
    // customerUpdated.lastName = customer?.lastName;

    new AdminService()
      .updateCustomer(customerUpdated)
      .then(() => {
        // notify success
        notificationService.success("Customer Updated!");
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
    <div className="UpdateCustomer">
      <h2>Update Customer :</h2>
      <form onSubmit={handleSubmit(send)}>
        <label>Company ID: </label>
        <input
          disabled={true}
          value={customer?.id + ""}
          type="number"
          id="price"
          {...register("id", {
            min: { value: 0, message: "ID cannot be negative!" },
          })}
        />
        <br />
        <br />

        <label>First Name: </label>
        <input
          placeholder={customer?.firstName}
          //disabled={true}
          type="text"
          id="firstName"
          {...register("firstName", {
            required: { value: true, message: "First name required!" },
            minLength: {
              value: 2,
              message: "name must be at least 2 chars long",
            },
          })}
        />
        <br />
        <span className="error">{formState.errors?.firstName?.message}</span>
        <br />

        <label>Last Name: </label>
        <input
          placeholder={customer?.lastName}
          //disabled={true}
          type="text"
          id="name"
          {...register("lastName", {
            required: { value: true, message: "Last name required!" },
            minLength: {
              value: 2,
              message: "Last name must be at least 2 chars long",
            },
          })}
        />
        <br />
        <span className="error">{formState.errors?.lastName?.message}</span>
        <br />

        <label>Email : </label>
        <input
          placeholder={customer?.email}
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

export default UpdateCustomer;
