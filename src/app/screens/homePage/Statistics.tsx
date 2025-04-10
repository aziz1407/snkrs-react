import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import PaymentIcon from "@mui/icons-material/Payment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const infoItems = [
  {
    icon: <LocalShippingIcon fontSize="large" sx={{ color: "#dddddd" }} />,
    title: "SHIPPING",
    desc: "Fast and secure in a variety of modes.",
  },
  {
    icon: <ReplayIcon fontSize="large" sx={{ color: "#dddddd" }} />,
    title: "RETURN",
    desc: "Within 14 days of delivery.",
  },
  {
    icon: <PaymentIcon fontSize="large" sx={{ color: "#dddddd" }} />,
    title: "PAYMENT",
    desc: "By card or secure installment payments.",
  },
  {
    icon: <ChatBubbleOutlineIcon fontSize="large" sx={{ color: "#dddddd" }} />,
    title: "CONTACT US",
    desc: "If you have any question, feel free to contact.",
  },
];

export default function Statistics() {
  return (
    <Box sx={{ py: 6, backgroundColor: "#1a1a1a" }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {infoItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center">
                <Box mb={1}>
                  {item.icon}
                </Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#fefefe" }} // brighter title
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#cccccc" }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
