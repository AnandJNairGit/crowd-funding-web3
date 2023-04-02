import { FilterAlt } from "@mui/icons-material";
import { Chip, Container, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const Filter = ({ onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Chip
          clickable
          onClick={handleClick}
          sx={{ marginTop: 1 }}
          icon={<FilterAlt />}
          label="Filter Campaigns"
          color="info"
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          //   anchorReference="anchorPosition"
          //   anchorPosition={{ top: window.innerHeight, left: window.innerWidth }}
        >
          <MenuItem
            onClick={() => {
              onChange(0);
              handleClose();
            }}
          >
            Pending
          </MenuItem>
          <MenuItem
            onClick={() => {
              onChange(1);
              handleClose();
            }}
          >
            Completed
          </MenuItem>
          <MenuItem
            onClick={() => {
              onChange(2);
              handleClose();
            }}
          >
            Refundable
          </MenuItem>
        </Menu>
      </Container>
    </>
  );
};

export default Filter;
