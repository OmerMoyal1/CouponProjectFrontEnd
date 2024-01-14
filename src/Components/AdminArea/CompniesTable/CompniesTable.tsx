import "./CompniesTable.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CompanyModel from "../../../Models/CompanyModel";
import AdminService from "../../../Services/AdminService";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { UpgradeOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";

function CompniesTable(): JSX.Element {
  const [compnies, setCompnies] = React.useState<CompanyModel[]>([]);
  const navigate = useNavigate();

  function deleteCompany(companyId: number) {
    new AdminService()
      .deleteCompany(companyId)
      .then((s) => notificationService.success(s))
      .catch((err) => {
        notificationService.error(err);
        if (err.request.status == 440) {
          authService.logout();
          navigate("/login");
        }
      });
  }
  function updateComapny(companyId: number) {
    navigate("/admin/updateCompany/" + companyId);
  }

  React.useEffect(() => {
    new AdminService()
      .getAllCompnies()
      .then((c) => setCompnies(c))
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
    <div className="CompniesTable">
      <h2>Companies :</h2>
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
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compnies.map((c) => (
                <TableRow
                  key={c.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {c.email}
                  </TableCell>
                  <TableCell align="right">{c.id}</TableCell>
                  <TableCell align="right">{c.name}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <IconButton
                      onClick={() => updateComapny(c.id)}
                      aria-label="Upgrade"
                    >
                      <UpgradeOutlined />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteCompany(c.id)}
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

export default CompniesTable;
