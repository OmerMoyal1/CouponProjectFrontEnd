import "./Routing.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import Customer from "../../CustomerArea/Customer/Customer";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Company from "../../CompanyArea/Company/Company";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import Admin from "../../AdminArea/Admin/Admin";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import { authStore } from "../../../Redux/AuthState";
import React, { Component, useState } from "react";
import PageNotFound from "../../PageNotFoundArea/PageNotFound/PageNotFound";
import AboutUs from "../../AboutUsArea/AboutUs/AboutUs";

function Routing(): JSX.Element {
  const [type, setType] = useState<string>();
  authStore.subscribe(() => {
    if (authStore.getState().user.clientType.toString != null) {
      setType(authStore.getState().user.clientType.toString());
    } else {
      setType("unautoriezed");
    }
  });

  

  // function PrivateRoute(component:React.ReactNode, typeInput: string) {
  //   const auth = type == typeInput;
  //   console.log(auth);
  //   return auth ? {component} : <Navigate to="/login" />;
  // }






  // Private routes so if a client will try to get to a page that they are not athorized it will send them to login 
  //***** Idealy it would have been  1 method (the commented method above) but ReactNode does not match ReactNode :) ******/

  function PrivateRouteCustomer() {
    const auth = type == "CUSTOMER";

    return auth ? <Customer /> : <Navigate to="/login" />;
  }
  function PrivateRouteCompany() {
    const auth = type == "COMPANY";

    return auth ? <Company /> : <Navigate to="/login" />;
  }

  function PrivateRouteUpdateCoupon() {
    const auth = type == "COMPANY";

    return auth ? <UpdateCoupon /> : <Navigate to="/login" />;
  }
  function PrivateRouteUpdateCompany() {
    const auth = type == "ADMINISTRATOR";

    return auth ? <UpdateCompany /> : <Navigate to="/login" />;
  }
  function PrivateRouteUpdateCustomer() {
    const auth = type == "ADMINISTRATOR";

    return auth ? <UpdateCustomer /> : <Navigate to="/login" />;
  }

  function PrivateRouteAdmin() {
    const auth = type == "ADMINISTRATOR";

    return auth ? <Admin /> : <Navigate to="/login" />;
  }
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        {/* <Route path="/customer" element={PrivateRoute(<Company/>,"COMPANY")} /> */}
        <Route path="/customer" element={PrivateRouteCustomer()} />
        <Route path="/company" element={PrivateRouteCompany()} />
        <Route path="/admin" element={PrivateRouteAdmin()} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/company/updateCoupon/:id"
          element={PrivateRouteUpdateCoupon()}
        />
        <Route
          path="/admin/updateCompany/:id"
          element={PrivateRouteUpdateCompany()}
        />
        <Route
          path="/admin/updateCustomer/:id"
          element={PrivateRouteUpdateCustomer()}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
