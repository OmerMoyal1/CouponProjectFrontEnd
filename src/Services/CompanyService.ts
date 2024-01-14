import axios from "axios";
import { CouponModel } from "../Models/CouponModel";
import appConfig from "../Utils/Config";

class CompanyService {
  static addCoupon(coupon: CouponModel) {
    throw new Error("Method not implemented.");
  }
  public async getAllCoupons() {
    const response = axios.get<CouponModel[]>(
      appConfig.companyurl + "getAllCompanyCoupons"
    );

    return (await response).data;
  }

  public async deleteCoupon(couponId: number) {
    const response = axios.delete(appConfig.companyurl + couponId);

    return (await response).data;
  }

  public async AddCoupon(coupon: CouponModel) {
    
      const response = await axios.post<CouponModel>(
        appConfig.companyurl + "addCoupon",
        coupon
      );
      return (await response).data;
      
  }
  public async getOneCoupon(couponId: number) {
    const response = axios.get<CouponModel>(
      appConfig.companyurl + "getOneCoupon/" + couponId
    );

    return (await response).data;
  }

  public async UpdateCoupon(coupon: CouponModel) {
    const response = await axios.post<CouponModel>(
      appConfig.companyurl + "updateCoupon",
      coupon
    );
    return (await response).data;
  }
}
export default CompanyService;
