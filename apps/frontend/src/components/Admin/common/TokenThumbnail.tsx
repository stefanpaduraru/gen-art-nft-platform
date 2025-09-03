import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Token } from "../../../types/token";
import { ExtendedProject } from "../../../types/project";
import { Networks, Network } from "../../../types/network";
import { MAX_PROJECT_TOKENS } from "../../../constants/default";
import { MintoriaGallery } from "../../../types/galleries";

type Props = {
  token: Token;
  project: ExtendedProject;
  gallery: MintoriaGallery;
};
const TokenThumbnail = ({ token, project, gallery }: Props) => {
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
    <Card elevation={0}>
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
            #{tokenId ? tokenId % MAX_PROJECT_TOKENS : ""}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        {
          <Button
            size="small"
            color="primary"
            onClick={() => editProject(projectId)}
          >
            Edit
          </Button>
        }
      </CardActions> */}
    </Card>
  );
};

export default TokenThumbnail;
