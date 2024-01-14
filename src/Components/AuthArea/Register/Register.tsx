import { Box, Tabs, Tab } from "@mui/material";
import Switch from "@mui/material/Switch/Switch";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { UserModel } from "../../../Models/UserModel";

import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import CompniesTable from "../../AdminArea/CompniesTable/CompniesTable";
import CustomersTable from "../../AdminArea/CustomersTable/CustomersTable";
import RegisterCompany from "../RegisterCompany/RegisterCompany";
import RegisterCustomer from "../RegisterCustomer/RegisterCustomer";
import "./Register.css";

function Register(): JSX.Element {
  const [checked, setChecked] = React.useState(true);
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="Register box">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="0vh"
        sx={{ width: "100%" }}
      >
        <Tabs
          textColor="inherit"
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Register Customer" />
          <Tab value="two" label="Register Company" />
        </Tabs>
      </Box>
      {value === "one" && <RegisterCustomer />}
      {value === "two" && <RegisterCompany />}
    </div>
  );
}

export default Register;
