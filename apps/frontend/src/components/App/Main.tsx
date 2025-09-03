import { Box } from "@mui/material";

const Main = ({ children }: { children: any }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "calc(100vh)",
      pt: 15,
    }}
  >
    {children}
  </Box>
);

export default Main;
