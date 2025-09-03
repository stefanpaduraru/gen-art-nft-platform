import React from "react";
import { Paper, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchQuery: string;
  setSearchQuery: Function;
};

const SearchInput = ({ searchQuery, setSearchQuery }: Props) => {
  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        value={searchQuery}
        onChange={handleChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="search by token"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
