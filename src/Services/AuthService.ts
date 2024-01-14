import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import UserDetailsModel from "../Models/UserDetailsModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

class AuthService {
  public async login(user: UserDetailsModel) {
    const response = axios.post<string>(appConfig.authurl + "login", user);
    const token = (await response).data;
    console.log(token);
    authStore.dispatch(loginAction(token));
  }

  public async registerCustomer(user: CustomerModel) {
    const response = axios.post<string>(
      appConfig.authurl + "registerCustomer",
      user
    );
    const token = (await response).data;
  }

  public async registerCompany(user: CompanyModel) {
    const response = axios.post<string>(
      appConfig.authurl + "registerCompany",
      user
    );
    const token = (await response).data;
  }

  public async logout() {
    authStore.dispatch(logoutAction());
  }
}
const authService = new AuthService();
export default authService;
