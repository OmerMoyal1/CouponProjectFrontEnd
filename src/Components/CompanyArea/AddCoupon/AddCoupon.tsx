import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoryType from "../../../Models/CategoryTypes";
import { CouponModel } from "../../../Models/CouponModel";
import authService from "../../../Services/AuthService";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const navigate = useNavigate();

  function send(coupon: CouponModel) {
    // fix for one file only in React
    //coupon.image = (coupon.image as FileList)[0];
    let reader = new FileReader();
    var image = coupon.image as unknown as FileList;
    //var image = coupon.image as FileList;
    reader.readAsDataURL(image[0]);
    reader.onload = async function () {
      coupon.image = reader.result as string;
            //couponsStore.dispatch(createAddActionCoup(newCoupon));
            new CompanyService()
      .AddCoupon(coupon)
      .then(() => {
        
        notificationService.success("Coupon  added!");
      })
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
    
  }

  return (
    <div className="AddCoupon">
      <h2>Add Coupon :</h2>
      <form onSubmit={handleSubmit(send)}>
        <label htmlFor="">Category :</label>
        <select {...register("category", {})} id="category" name="category">
          <option value={CategoryType[CategoryType.Food]}>Food</option>
          <option value={CategoryType[CategoryType.Electricity]}>
            Electricity
          </option>
          <option value={CategoryType[CategoryType.Restaurant]}>
            Restaurant
          </option>
          <option value={CategoryType[CategoryType.Vacation]}>Vacation</option>
          <option value={CategoryType[CategoryType.Clothes]}>Clothes</option>
          <option value={CategoryType[CategoryType.Other]}>Other</option>
        </select>
        <br />
        <br />
        <label>Title: </label>
        <input
          type="text"
          id="title"
          {...register("title", {
            required: { value: true, message: "You must enter a title!" },
            minLength: {
              value: 2,
              message: "Title must be at least 2 characters long",
            },
            maxLength: {
              value: 100,
              message: "Title must be maximum 100 characters long",
            },
          })}
        />
        <br />
        <span className="error">{formState.errors?.title?.message}</span>
        <br />
        <label>Description : </label>
        <input
          type="description"
          id="description"
          {...register("description", {
            required: { value: true, message: "You must enter a description!" },
            minLength: {
              value: 2,
              message: "description must be at least 2 characters long",
            },
            maxLength: {
              value: 100,
              message: "description must be maximum 100 characters long",
            },
          })}
        />
        <br />
        <span className="error">{formState.errors?.description?.message}</span>
        <br />
        <label>Price: </label>
        <input
          type="number"
          id="price"
          {...register("price", {
            min: { value: 0, message: "Price cannot be negative!" },
            max: { value: 1000, message: "Price cannot be over 1000!" },
          })}
        />
        <br />
        <span className="error">{formState.errors?.price?.message}</span>
        <br />
        <label>Start Date : </label>
        <input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: { value: true, message: "You must enter a start date!" },
          })}
        />
        <br />
        <span className="error">{formState.errors?.startDate?.message}</span>
        <br />
        <label>End Date : </label>
        <input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: { value: true, message: "You must enter a end date!" },
          })}
        />
        <br />
        <span className="error">{formState.errors?.endDate?.message}</span>
        <br />
        <label>Amount: </label>
        <input
          type="number"
          id="amount"
          {...register("amount", {
            min: { value: 0, message: "Stock cannot be negative!" },
            max: { value: 1000, message: "Stock cannot be over 1000!" },
          })}
        />
        <br />
        <span className="error">{formState.errors?.amount?.message}</span>
        <br />
        <input
          type="file"
          {...register("image", {
            required: { value: true, message: "You must enter an image!" },
          })}
        />
        <br />
        <span className="error">{formState.errors?.image?.message}</span>
        <br />
        <button className="btn">Add</button>
      </form>
    </div>
  );
}

export default AddCoupon;
