import React from "react";
import { Typography } from "@mui/material";

const MintWarning = () => {
  return (
    <>
      <Typography variant="body1" fontWeight="light" sx={{ mb: 4 }}>
        By submitting a purchase transaction you aknowledge the following:
      </Typography>
      <ul>
        <li>
          <Typography variant="body1" fontWeight={"light"}>
            You are competing with other buyers.
          </Typography>
        </li>
        {/* <li>
          <Typography variant="body1" fontWeight={"light"}>
            You might have to pay higher gas price to give your transaction more
            priority.
          </Typography>
        </li> */}
        <li>
          <Typography variant="body1" fontWeight={"light"}>
            There's a chance your transaction will be confirmed after the
            project is completed, which will result in a failed transaction and
            a loss of paid gas fees.
          </Typography>
        </li>
      </ul>
    </>
  );
};

export default MintWarning;
