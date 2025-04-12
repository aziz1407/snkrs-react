import React, { useState } from "react";
import { Box, Container, Stack, Paper, Button } from "@mui/material";

export default function HelpPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <Stack className="frame">
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        py: 12,
        px: 2,
        backgroundImage:
          "radial-gradient(circle at 20% 20%, #f0f8ff 0%, #ffffff 80%)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 8,
            p: 6,
            boxShadow: "0 30px 60px rgba(68, 58, 58, 0.12)",
            border: "1px solid #e0e0e0",
            height: "auto",
            display: "flex",
            background: "#c2aa8e",
            flexDirection: "column",
            alignItems: "center",
          }} className="paper"
        >
          <Stack className="about-title">
            <h2 style={{textAlign: "center", marginTop: "0px"}}>Who are we?</h2>
            <Box className="text">
              <span>
                Founded on July 14, 2003, in the heart of Andijan, Uzbekistan,
                our SNKRS store began as a small local sneaker hub and has since
                grown into a destination for sneaker enthusiasts across the
                nation and beyond. Built from passion, style, and a vision to
                bring the world's best sneakers closer to our community, we've
                evolved into more than just a store — we're a culture.
                <br />
                <br />
                {showMore && (
                  <>
                    From humble beginnings, our goal was clear: deliver
                    authentic, high-quality sneakers from top global brands and
                    empower our customers to express their individuality through
                    footwear. Over the years, we've built strong relationships
                    with world-class partners, working closely with legendary
                    brands like Nike, Adidas, New Balance, Puma, and Converse.
                    These partnerships allow us to offer exclusive drops,
                    limited editions, and the freshest styles to our loyal
                    customers.
                    <br />
                    <br />
                    Our store isn't just about sneakers — it's about community,
                    authenticity, and style. We've served thousands of
                    sneakerheads across Uzbekistan and gained a reputation for
                    trust, service, and passion. Our curated selection, expert
                    guidance, and attention to customer needs make every visit
                    to our store a unique experience.
                    <br />
                    <br />
                    We've also proudly collaborated with local creatives and
                    international platforms to promote sneaker culture
                    throughout Central Asia. With over two decades of
                    experience, we continue to grow, aiming to become Central
                    Asia's top sneaker destination.
                    <br />
                    <br />
                    Whether you're a collector, athlete, or trendsetter, welcome
                    to SNKRS — where passion meets the sole.
                    <br />
                    <br />
                  </>
                )}
                <Button
                  onClick={() => setShowMore(!showMore)}
                  variant="text"
                  sx={{ mt: 1, fontWeight: "bold", textTransform: "none", color: "black"}} 
                >
                  {showMore ? "Show Less ▲" : "Read More ▼"}
                </Button>
              </span>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
    </Stack>
  );
}
