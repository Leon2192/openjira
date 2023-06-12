import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";

import { MenuOutlined } from "@mui/icons-material";
import NextLink from 'next/link'
import UIContext from "../../context/ui/UIContext";

const Navbar = () => {
  const { openSideMenu, closeSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>

        <NextLink href='/' passHref>
          <Typography variant="h6">OpenJira</Typography>
        </NextLink>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
