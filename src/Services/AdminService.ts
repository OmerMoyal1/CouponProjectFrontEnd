import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import appConfig from "../Utils/Config";

class AdminService {
  public async getAllCompnies() {
    const response = axios.get<CompanyModel[]>(
      appConfig.adminyurl + "getAllCompanies"
    );
    return (await response).data;
  }
  public async deleteCompany(customerId: number) {
    const response = axios.delete(
      appConfig.adminyurl + "deleteCompany/" + customerId
    );
    return (await response).data;
  }
  public async getOneCompany(companyId: number) {
    const response = axios.get<CompanyModel>(
      appConfig.adminyurl + "getOneCompany/" + companyId
    );
    return (await response).data;
  }
  public async updateCompany(company: CompanyModel) {
    const response = axios.post(
      appConfig.adminyurl + "updateCompany/",
      company
    );
    return (await response).data;
  }
  public async getAllCustomers() {
    const response = axios.get<CustomerModel[]>(
      appConfig.adminyurl + "getAllCustomers"
    );
    return (await response).data;
  }
  public async deleteCustomer(customerId: number) {
    const response = axios.delete(
      appConfig.adminyurl + "deleteCustomer/" + customerId
    );
    return (await response).data;
  }
  public async updateCustomer(customer: CustomerModel) {
    const response = axios.post<CustomerModel>(
      appConfig.adminyurl + "updateCustomer/",
      customer
    );
    return (await response).data;
  }
  public async getOneCustomer(customerId: number) {
    const response = axios.get<CustomerModel>(
      appConfig.adminyurl + "getOneCustomer/" + customerId
    );
    return (await response).data;
  }
}
export default AdminService;
