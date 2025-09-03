import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Project } from "../../../types/project";

type Props = {
  value: "newest" | "oldest" | "rarity";
  handleChange: (e: SelectChangeEvent) => void;
  project: Project;
};

const TokenGallerySort = ({ value, handleChange, project }: Props) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        id="token-sort"
        value={value}
        onChange={handleChange}
        label="Token Sort"
      >
        <MenuItem value={"newest"}>Newest first</MenuItem>
        <MenuItem value={"oldest"}>Oldest first</MenuItem>
        {project.isCompleted && (
          <MenuItem value={"rarity"}>Rarity Score</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default TokenGallerySort;
