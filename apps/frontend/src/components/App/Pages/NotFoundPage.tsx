import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Typography variant="h3" component="div" sx={{ mt: 8 }}>
        Not Found
      </Typography>

      <Typography variant="body1" component="div" sx={{ mt: 3, mb: 5 }}>
        Resource not found. Click{" "}
        <Link to="/" style={{ textDecoration: "none" }}>
          here
        </Link>{" "}
        to return to the homepage.
      </Typography>
    </>
  );
};

export default NotFoundPage;
