import React from "react";
import { Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import PaymentIcon from "@mui/icons-material/Payment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SecurityIcon from "@mui/icons-material/Security";

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
  {
    icon: <SecurityIcon fontSize="large" sx={{ color: "#dddddd" }} />,
    title: "SECURE SHOPPING",
    desc: "Your data and transactions are 100% protected.",
  },
];

export default function InfoSection() {
  const scrollingItems = [...infoItems, ...infoItems]; // Duplicate for endless loop

  return (
    <Box
      sx={{
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        py: 4,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: "scrollLeft 20s linear infinite",
        }}
      >
        {scrollingItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 280,
              px: 3,
              textAlign: "center",
            }}
          >
            <Box mb={1}>{item.icon}</Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#fefefe" }}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#cccccc" }}>
              {item.desc}
            </Typography>
          </Box>
        ))}
      </Box>

      <style>
        {`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </Box>
  );
}
