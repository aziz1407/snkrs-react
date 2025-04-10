import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PublicIcon from "@mui/icons-material/Public";

const Footers = styled.div`
  width: 100%;
  background: #1a1a1a;
  padding: 70px 0 40px 0;
  background-image: linear-gradient(160deg, #1a1a1a 0%, #2a2a2a 100%);
  box-shadow: 0px -8px 40px rgba(0, 0, 0, 0.6);
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr 1fr" }}
            gap={6}
          >
            <Stack spacing={2}>
              <Box>
                <NavLink to="/">
                  <img className="brand-logo" />
                </NavLink>
              </Box>
              <Box className="foot-desc-txt" style={{ maxWidth: "320px" }}>
                Focusing on premium sneakers and youth culture, SNKRS aims to
                bring iconic style back to the streets. SNKRS blends hype and
                heritage, creating a fresh illusion with every drop.
              </Box>
            </Stack>

            <Stack spacing={1}>
              <Box className="foot-category-title">Sections</Box>
              <Box className="foot-category-link">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                {authMember && <Link to="/orders">Orders</Link>}
                <Link to="/help">Help</Link>
              </Box>
            </Stack>

            <Stack spacing={1}>
              <Box className="foot-category-title">Find us</Box>
              <Box className="foot-category-link">
                <Box className="find-us">
                  <span>L.</span>
                  <div>Downtown, Andijan</div>
                </Box>
                <Box className="find-us">
                  <span>P.</span>
                  <div>+998 91 490 77 33</div>
                </Box>
                <Box className="find-us">
                  <span>E.</span>
                  <div>snkrs@gmail.com</div>
                </Box>
                <Box className="find-us">
                  <span>H.</span>
                  <div>Visit 24 hours</div>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            className="sns-context"
            gap={2}
          >
            <a
              href="https://www.facebook.com/sneakershopping/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon style={{ color: "#fff" }} />
            </a>
            <a
              href="https://t.me/Abdulaziz_Ibrokhimov"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon style={{ color: "#fff" }} />
            </a>
            <a
              href="https://www.instagram.com/abdulaziz__ibrokhimov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon style={{ color: "#fff" }} />
            </a>
            <a
              href="https://www.youtube.com/sneakertalk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon style={{ color: "#fff" }} />
            </a>
            <Box
              className="globe-tag"
              display="flex"
              alignItems="center"
              gap={0.5}
            >
              <PublicIcon style={{ color: "#fff", fontSize: "18px" }} />
              <span style={{ color: "#fff" }}>Uzbekistan</span>
            </Box>
          </Box>

          <Box
            style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(to right, #444, #666, #444)",
              opacity: 0.3,
              marginTop: "40px",
            }}
          />

          <Box className="copyright-txt" textAlign="center">
            © Copyright Aiden Team, All rights reserved.
          </Box>
        </Stack>
      </Container>
    </Footers>
  );
}
