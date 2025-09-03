import React from "react";
import { CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Routes from "../../../../constants/routes";
import StyledCard from "../../Projects/common/StyledCard";
import { Artist } from "../../../../types/user";

type Props = {
  artist: Artist;
};
const ArtistCard = ({ artist }: Props) => {
  const linkTo = Routes.getUserPage(`${artist.address}`);
  const memberSince = new Date(artist.createdAt).toLocaleDateString();

  const coverImage =
    artist.featuredToken?.imageURL ?? "/images/project-placeholder.png";
  return (
    <StyledCard>
      <CardActionArea component={Link} to={linkTo}>
        <CardMedia
          component="img"
          height="280"
          image={coverImage}
          alt="Artist image"
        />

        <CardContent>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontSize: "1.87rem" }}
            noWrap
          >
            {artist.name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              height: 50,
              overflow: "hidden",
              whiteSpace: "pre-line",
              textOverflow: "ellipsis",
              mb: 2,
            }}
          >
            {artist.bio}
          </Typography>
          <Typography color="body2">Member since {memberSince}</Typography>

          <Typography sx={{ mt: 1 }} color="text.secondary" noWrap></Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ArtistCard;
