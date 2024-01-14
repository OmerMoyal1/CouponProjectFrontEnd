class Config {}

class DevConfig extends Config {
  public guesturl: string = "http://localhost:8080/guest";
  public authurl: string = "http://localhost:8080/auth/";
  public customerurl: string = "http://localhost:8080/customer/";
  public companyurl: string = "http://localhost:8080/company/";
  public adminyurl: string = "http://localhost:8080/admin/";
}

class ProductionConfig extends Config {
  public guesturl: string = "http://localhost:8080/guest";
  public authurl: string = "http://localhost:8080/auth/";
  public customerurl: string = "http://localhost:8080/customer/";
  public companyurl: string = "http://localhost:8080/company/";
  public adminyurl: string = "http://localhost:8080/admin/";
}
const appConfig =
  process.env.NODE_ENV === "development"
    ? new DevConfig()
    : new ProductionConfig();

export default appConfig;
