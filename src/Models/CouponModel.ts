import CompanyModel from "./CompanyModel";

export class CouponModel {
  public id!: number;
  public category!: string;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public amount!: number;
  public price!: number;
  public image!: string;
  public company?: CompanyModel;
}
