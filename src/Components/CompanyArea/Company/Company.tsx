import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import AddCoupon from "../AddCoupon/AddCoupon";
import CompanyCoupons from "../CompanyCoupons/CompanyCoupons";
import "./Company.css";

function Company(): JSX.Element {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
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
          <Tab value="one" label="Coupons" />
          <Tab value="two" label="Add Coupon" />
        </Tabs>
      </Box>
      {value === "one" && <CompanyCoupons />}
      {value === "two" && <AddCoupon />}
    </div>
  );
}

export default Company;
