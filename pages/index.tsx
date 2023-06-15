import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

import EntryList from "../components/ui/EntryList";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layouts/Layout";
import NewEntry from "../components/ui/NewEntry";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {


  return (
    <Layout title="RLARQ - Openjira">

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendientes" />
            <NewEntry />
            <CardContent>
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="En progreso" />

            <CardContent>
              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Terminadas" />

            <CardContent>
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
