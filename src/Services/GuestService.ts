import axios from "axios";
import { CouponModel } from "../Models/CouponModel";
import appConfig from "../Utils/Config";

class GuestService {
  public async getAllCoupons() {
    const response = axios.get<CouponModel[]>(appConfig.guesturl);
    return (await response).data;
  }
}
export default GuestService;
