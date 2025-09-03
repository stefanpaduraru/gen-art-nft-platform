import { Typography } from "@mui/material";
import React from "react";

const FAQContent = ({ text }: { text: String | JSX.Element }) => (
  <Typography variant="body1" fontWeight={"light"} sx={{ mt: 1 }}>
    {text}
  </Typography>
);

export default FAQContent;
