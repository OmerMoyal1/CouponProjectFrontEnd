import { UpgradeOutlined } from "@mui/icons-material";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import AdminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CustomersTable.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import authService from "../../../Services/AuthService";

function CustomersTable(): JSX.Element {
  const [customers, setCustomers] = React.useState<CustomerModel[]>([]);
  const navigate = useNavigate();

  function deleteCustomer(customerId: number) {
    new AdminService()
      .deleteCustomer(customerId)
      .then((s) => notificationService.success(s))
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }
  function updateCustomer(companyId: number) {
    navigate("/admin/updateCustomer/" + companyId);
  }

  React.useEffect(() => {
    new AdminService()
      .getAllCustomers()
      .then((c) => setCustomers(c))
      .then()
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="CustomersTable">
      {" "}
      <h2>Customers :</h2>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((c) => (
                <TableRow
                  key={c.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {c.email}
                  </TableCell>
                  <TableCell align="right">{c.id}</TableCell>
                  <TableCell align="right">{c.firstName}</TableCell>
                  <TableCell align="right">{c.lastName}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <IconButton
                      onClick={() => updateCustomer(c.id)}
                      aria-label="Upgrade"
                    >
                      <UpgradeOutlined />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteCustomer(c.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default CustomersTable;
