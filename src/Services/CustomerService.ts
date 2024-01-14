import axios from "axios";
import { CouponModel } from "../Models/CouponModel";
import appConfig from "../Utils/Config";

class CustomerService {
  public async getAllCoupons() {
    const response = axios.get<CouponModel[]>(appConfig.customerurl);

    return (await response).data;
  }

  public async getAllCouponsByCategory() {
    const response = axios.get<CouponModel[]>(appConfig.customerurl);

    return (await response).data;
  }
  public async purchaseCoupon(couponId: number) {
    console.log(couponId);

    const response = axios.post(
      appConfig.customerurl + "purchaseCoupon/" + couponId,
      couponId
    );

    return (await response).data;
  }
}
export default CustomerService;
