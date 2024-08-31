import { Container, Grid } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Container>
      <Grid container>
        <Grid item></Grid>
        <Grid item>
          <img
            alt="google_logo"
            className="landingImages"
            src="/images/FAQ.png"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default index;
