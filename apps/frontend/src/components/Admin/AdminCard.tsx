import {
  Card,
  CardActionArea,
  CardContent,
  IconProps,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  route: string;
  icon?: IconProps;
};
const AdminCard = ({ title, route, icon }: Props) => {
  return (
    <Card elevation={1}>
      <CardActionArea component={Link} to={route}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ pb: 3, pt: 3, justifyContent: "center", display: "flex" }}
          >
            {!!icon && icon}
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default AdminCard;
