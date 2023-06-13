import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";

import { AiOutlineMenuFold } from 'react-icons/ai'
import NextLink from 'next/link'
import UIContext from "../../context/ui/UIContext";

const Navbar = () => {
  const { openSideMenu, closeSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <AiOutlineMenuFold />
        </IconButton>

        <NextLink href='/' passHref>
          <Typography variant="h6">OpenJira</Typography>
        </NextLink>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
