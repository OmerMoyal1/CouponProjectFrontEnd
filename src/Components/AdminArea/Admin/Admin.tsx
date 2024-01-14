import { Box, Tabs, Tab } from "@mui/material";
import React from "react";

import CompniesTable from "../CompniesTable/CompniesTable";
import CustomersTable from "../CustomersTable/CustomersTable";
import "./Admin.css";

function Admin(): JSX.Element {
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="Admin">
      {" "}
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
            <Tab value="one" label="Companies" />
            <Tab value="two" label="Customers" />
          </Tabs>
        </Box>
        {value === "one" && <CompniesTable />}
        {value === "two" && <CustomersTable />}
      </div>
    </div>
  );
}

export default Admin;
