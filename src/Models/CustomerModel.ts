import { CouponModel } from "./CouponModel";

export class CustomerModel {
  public id!: number;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public password!: string;
  public coupons?: CouponModel[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.id = 0;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.coupons = [];
  }
}
export default CustomerModel;
