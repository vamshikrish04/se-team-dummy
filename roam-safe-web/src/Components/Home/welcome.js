import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import styles from "../../Css/home.module.css";
import imgs from "../../Images/welcom.webp";

export default function Welcome() {
  return (
    <Container maxWidth="xl">
      <Grid container sx={{ padding: "20px" }}>
        <Grid lg={6} md={6} sm={12} sx={{ display: "flex" }}>
          <img src={imgs} className={styles.welcome_image} alt="welcome img" />
        </Grid>
        <Grid lg={6} md={6} sm={12} sx={{ padding: "24px" }}>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "600",
              textAlign: "start",
              lineHeight: "36.31px",
            }}
          >
            Welcome to Roam Safe
          </Typography>
          <p className={styles.welcome_paragraph}>
          At Roam Safe, we've reimagined the way travelers experience roadside assistance. 
          Our innovative platform seamlessly connects you with nearby automotive experts, 
          ensuring swift and reliable solutions to your automotive needs. 
          Whether you're facing an unexpected breakdown, need efficient towing, 
          or seek expert diagnostics, Roam Safe is your trusted companion on the road.
          </p>

          <p className={styles.welcome_paragraph}>
          
          But Roam Safe is more than just a roadside assistance platform; 
          it's a community dedicated to making every journey safer and more convenient. 
          Take control of your automotive needs, provide ratings, 
          and leave valuable feedback to contribute to the Roam Safe community. 
          Welcome to a new era of hassle-free travel, where Roam Safe is your trusted partner on the road.
          </p>

        </Grid>
      </Grid>
    </Container>
  );
}
