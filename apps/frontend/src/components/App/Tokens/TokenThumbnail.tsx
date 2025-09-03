import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MAX_PROJECT_TOKENS } from "../../../constants/default";
import { Themes } from "../../../context/ThemeContext";

type Props = {
  tokenId: number;
  tokenURL: string;
  imageURL?: string;
};
const TokenThumbnail = ({ tokenId, tokenURL, imageURL }: Props) => {
  const coverImage = imageURL ?? "/images/project-placeholder.png";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "12px",
        boxShadow: (theme) =>
          theme.palette.mode === Themes.LIGHT
            ? "0 22px 44px rgb(0 0 0 / 5%)"
            : "0 22px 44px rgb(255 255 255 / 0%)",
      }}
    >
      <CardActionArea
        component={Link}
        to={tokenURL as string}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={coverImage}
          alt=""
          sx={{
            borderRadius: "12px",
            display: "flex",
            backgroundPosition: "center",
            width: "auto",
            maxWidth: "320px",
            maxHeight: "320px",
          }}
        />
        <CardContent>
          <Typography variant="body1" component="div" sx={{ mt: 0.3 }}>
            #{tokenId ? tokenId % MAX_PROJECT_TOKENS : ""}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TokenThumbnail;
