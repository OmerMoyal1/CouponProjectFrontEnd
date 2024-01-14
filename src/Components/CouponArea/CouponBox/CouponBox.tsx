import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CouponModel } from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import CompanyService from "../../../Services/CompanyService";
import CustomerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./CouponBox.css";

interface CouponProps {
  coupon: CouponModel;
}

function CouponBox(props: CouponProps): JSX.Element {
  const navigate = useNavigate();
  const [type, setType] = useState<string>();
  let data = convertDataUrlToBlob(props.coupon.image);

  authStore.subscribe(() => {
    if (authStore.getState().user.clientType.toString != null) {
      setType(authStore.getState().user.clientType.toString());
    } else {
      setType("Guest");
    }
  });

  function purchase() {
    new CustomerService()
      .purchaseCoupon(props.coupon.id)
      .then((c) => notificationService.success(c))
      .then()
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }
  function guestPurchase() {
    navigate("/login");
  }

  function deleteCoupon() {
    new CompanyService()
      .deleteCoupon(props.coupon.id)
      .then((s) => notificationService.success(s))
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }
  function updateCoupon() {
    navigate("/company/updateCoupon/" + props.coupon.id);
  }

  function convertDataUrlToBlob(dataUrl: any): Blob {
    const arr = dataUrl.split(",");

    const mime = arr[0].match(/:(.*?);/)[1];

    const bstr = atob(arr[1]);

    let n = bstr.length;

    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  return (
    //Coupon box for all client type btn conditinal rendering done with auth client type
    <div className="CouponBox">
      <Card
        sx={{ width: 350 }}
        //sx={{ maxWidth: 345 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))}
          alt={props.coupon.title + " img"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.coupon.title} | {props.coupon.company?.name + "  "}
          </Typography>

          <Typography variant="body1">
            Price : {props.coupon.price} $
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            {props.coupon.description}
          </Typography>
          <br />
          <Typography variant="subtitle2">
            Vaild : {props.coupon.startDate + ""} to {props.coupon.endDate + ""}{" "}
          </Typography>
        </CardContent>
        <CardActions>
          <>
            {authStore.getState().user.clientType === "CUSTOMER" && (
              <Button onClick={purchase} size="small">
                Purchase
              </Button>
            )}
          </>
          {authStore.getState().user.clientType === "COMPANY" && (
            <Button onClick={deleteCoupon} size="small">
              Delete
            </Button>
          )}
          {authStore.getState().user.clientType === "COMPANY" && (
            <Button onClick={updateCoupon} size="small">
              Update Coupon
            </Button>
          )}
          {authStore.getState().user.clientType === "GUEST" && (
            <Button onClick={guestPurchase} size="small">
              Purchase
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default CouponBox;
