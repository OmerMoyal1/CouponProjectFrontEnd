import { useState, useEffect } from "react";
import CategoryType from "../../../Models/CategoryTypes";
import { CouponModel } from "../../../Models/CouponModel";
import CustomerService from "../../../Services/CustomerService";
import CouponBox from "../../CouponArea/CouponBox/CouponBox";
import "./MyCoupons.css";

function MyCoupons(): JSX.Element {
  const [myCoupons, setMyCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    new CustomerService()
      .getAllCoupons()
      .then((c) => setMyCoupons(c))
      .then()
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
    <div className="MyCoupons">
      <h2>Your Coupons </h2>
      {myCoupons
        .filter((c) => c.category === c.category)
        .map((c) => (
          <CouponBox coupon={c} />
        ))}
    </div>
  );
}

export default MyCoupons;
