import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { MAX_PROJECT_TOKENS } from "../../../constants/default";

type Props = {
  tokenId: number;
};
const TokenLarge = ({ tokenId }: Props) => {
  return (
    <Card elevation={0} sx={{ display: "flex", justifyContent: "center" }}>
      <CardContent>
        <div>
          <img
            src={`http://localhost:3001/token/${tokenId}/image`}
            height="100%"
            width="100%"
            alt=""
            style={{ maxWidth: 400 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body1" component="div" sx={{ mt: 0.3 }}>
            Mint #{tokenId ? tokenId % MAX_PROJECT_TOKENS : ""}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenLarge;
