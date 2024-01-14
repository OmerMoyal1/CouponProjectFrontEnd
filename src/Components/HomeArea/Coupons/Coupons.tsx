import { CouponModel } from "../../../Models/CouponModel";
import { useEffect, useState } from "react";
import "./Coupons.css";
import CouponService from "../../../Services/GuestService";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import CouponBox from "../../CouponArea/CouponBox/CouponBox";

function Coupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    new CouponService()
      .getAllCoupons()
      .then((c) => setCoupons(c))
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="Coupons">
      {coupons.map((c) => (
        <CouponBox key={c.id} coupon={c} />
      ))}
    </div>
  );
}

export default Coupons;
