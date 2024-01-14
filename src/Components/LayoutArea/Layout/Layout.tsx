import { Box } from "@mui/material";
import Footer from "../Footer/Footer";
import Heading from "../Heading/Heading";
import Manu from "../Manu/Manu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <Heading />
      <Manu />
      <Box
        display="flex"
        justifyContent="center"
        //alignItems="center"
        minHeight="0vh"
      >
        <Routing />
      </Box>

      <Footer />
    </div>
  );
}

export default Layout;
