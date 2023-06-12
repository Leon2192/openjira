import React, { FC } from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

interface Props {
  title?: string;
  children?: any;
}

const Layout: FC<Props> = ({ title = "Openjira", children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      {/*Navbar */}
      <Navbar />
      {/*Sidebar */}
      <Sidebar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
