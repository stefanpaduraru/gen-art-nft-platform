import React from "react";
import { Box, Link } from "@mui/material";

type Props = {
  icon: "discord" | "twitter" | "instagram";
};
const SocialIcon = ({ icon }: Props) => {
  let imgSrc;
  let alt;
  let url;

  switch (icon) {
    case "discord":
      imgSrc = "/images/social-icons/discord.svg";
      alt = "Mintoria.io Discord Community";
      url = "https://discord.gg/SudxZYSzKK";
      break;

    case "instagram":
      imgSrc = "/images/social-icons/instagram.svg";
      alt = "Mintoria.io on Instagram";
      url = "https://www.instagram.com/mintoria.io/";
      break;

    case "twitter":
      imgSrc = "/images/social-icons/twitter.svg";
      alt = "Mintoria.io on Twitter";
      url = "https://twitter.com/mintoria_io";
  }
  return (
    <Box
      sx={{ backgroundColor: "#fffffff0", borderRadius: "50%", padding: "4px" }}
    >
      <Link
        href={url}
        target="_blank"
        sx={{ width: 24, height: 24, display: "flex" }}
      >
        <img src={imgSrc} width={24} height={24} alt={alt} />
      </Link>
    </Box>
  );
};

export default SocialIcon;
