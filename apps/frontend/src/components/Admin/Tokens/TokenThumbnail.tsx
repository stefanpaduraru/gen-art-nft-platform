import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Token } from "../../../types/token";
import { ExtendedProject } from "../../../types/project";
import { Networks, Network } from "../../../types/network";
import { MAX_PROJECT_TOKENS } from "../../../constants/default";
import { MintoriaGallery } from "../../../types/galleries";
import { Themes } from "../../../context/ThemeContext";
import RefreshIcon from "@mui/icons-material/Refresh";
import { formatDateShort } from "../../../util/dateFormatter";

type Props = {
  token: Token;
  project: ExtendedProject;
  gallery: MintoriaGallery;
  refreshRenderCallback: (tokenId: number) => void;
};
const TokenThumbnail = ({
  token,
  project,
  gallery,
  refreshRenderCallback,
}: Props) => {
  const tokenId = token.token;
  const coverImage =
    token && token.imageURL
      ? token.imageURL
      : "/images/project-placeholder.png";

  let network: Network;
  if (project.isDeployed) {
    network = project.isMainnet ? Networks.Mainnet : Networks.Testnet;
  } else {
    network = Networks.Template;
  }

  const tokenURL =
    network === Networks.Mainnet
      ? `/token/${gallery}/${tokenId}`
      : `/token/${gallery}/${network}/${tokenId}`;
  return (
    <CardStyled>
      <CardActionArea component={Link} to={tokenURL}>
        <CardMedia
          component="img"
          height="214"
          width="214"
          image={coverImage}
          alt=""
        />
        <CardContent>
          <Typography variant="body1" component="div" sx={{ mt: 0.3 }}>
            {project.name} #{tokenId ? tokenId % MAX_PROJECT_TOKENS : ""}
          </Typography>
          <Typography variant="body2" component="div" sx={{ mt: 0.2 }}>
            Created on {formatDateShort(new Date(token.createdAt || 0))}
          </Typography>
        </CardContent>
      </CardActionArea>
      {
        <CardActions>
          {
            <Button
              size="small"
              color="primary"
              onClick={() => {
                refreshRenderCallback && refreshRenderCallback(token.id);
              }}
              startIcon={<RefreshIcon />}
            >
              Render
            </Button>
          }
        </CardActions>
      }
    </CardStyled>
  );
};

const CardStyled = styled(Card)(({ theme }) => ({
  "&&": {
    borderRadius: "0.75rem",
    boxShadow:
      theme.palette.mode === Themes.LIGHT
        ? "0 22px 44px rgb(0 0 0 / 5%)"
        : "0 22px 44px rgb(255 255 255 / 0%)",
  },
}));

export default TokenThumbnail;
