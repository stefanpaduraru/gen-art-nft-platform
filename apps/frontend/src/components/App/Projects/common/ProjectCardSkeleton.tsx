import React from "react";
import { Skeleton } from "@mui/material";

const ProjectCardSkeleton = () => (
  <>
    <Skeleton
      variant="rectangular"
      width={360}
      height={145}
      sx={{ borderRadius: "10px" }}
    />
    <Skeleton
      variant="text"
      animation="wave"
      width={360}
      height={40}
      sx={{ mt: 0.5 }}
    />

    <Skeleton
      variant="text"
      animation="wave"
      width={360}
      height={16}
      sx={{ mt: 0.5 }}
    />
    <Skeleton variant="text" animation="wave" width={360} height={16} />
  </>
);

export default ProjectCardSkeleton;
