import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Paper,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import "../../../css/about.css";

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Abdukodir Khusanov",
      role: "Football player",
      image: "/img/kusanov.webp",
      text: `Working with SNKRS was a total game-changer. Their commitment to authenticity and slick style took our expectations to a whole new level.`,
      stars: 5,
    },
    {
      id: 2,
      name: "Islam Makhachev",
      role: "Ufc champion",
      image: "/img/islam.webp",
      text: `I respect hard work, and these guys clearly put their heart into this. It's not just a store — it's a whole culture. When I'm not training, I keep it light, and SNKRS keeps me looking sharp.”`,
      stars: 5,
    },
    {
      id: 3,
      name: "Lamine Yamal",
      role: "Football Player",
      image: "/img/lamine.jpg",
      text: `SNKRS isn't just a store — it's a movement. From exclusive drops to elite service, they're setting the gold standard for sneaker culture in Central Asia.`,
      stars: 5,
    },
    {
      id: 4,
      name: "Israil Madrimov",
      role: "Professional Boxer",
      image: "/img/israil.avif",
      text: `Hands down the best sneaker shop in Central Asia. They know what real style means.`,
      stars: 5,
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleNext = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const current = testimonials[testimonialIndex];

  return (
    <Box className="about-page">
      <Stack className="about-stack">
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center">
            <Paper className="about-paper" elevation={3}>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                fontWeight="bold"
                color="black"
              >
                Who are we?
              </Typography>
              <Typography className="about-text" color="black">
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
                  </>
                )}
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Button
                  onClick={() => setShowMore(!showMore)}
                  variant="contained"
                  className="show-more-button"
                  sx={{
                    bgcolor: "skyblue",
                    "&:hover": {
                      bgcolor: "#1a2930",
                    },
                    color: "white",
                    px: 3,
                  }}
                >
                  {showMore ? "Show Less ▲" : "Read More ▼"}
                </Button>
              </Box>
            </Paper>
          </Stack>
        </Container>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 3,
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="black" mb={4} sx={{marginBottom:"55px"}}>
            Review
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "1000px",
              width: "100%",
              position: "relative",
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: "-20px",
                zIndex: 1,
                bgcolor: "white",
                border: "1px solid #ccc",
              }}
            >
              <span style={{ fontSize: "24px" }}>←</span>
            </IconButton>

            <Paper
              elevation={3}
              sx={{
                display: "flex",
                p: 3,
                borderRadius: 4,
                bgcolor: "white",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 3,
                width: "100%",
                transition: "all 0.4s ease-in-out",
              }}
            >
              <Box
                component="img"
                src={current.image}
                alt={current.name}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: 3,
                  objectFit: "cover",
                }}
              />

              <Box>
                <Typography color="black" fontStyle="italic" mb={2}>
                  “{current.text}”
                </Typography>
                <Typography fontWeight="bold" color="black">
                  {current.name}
                </Typography>
                <Typography fontSize="14px" color="gray">
                  {current.role}
                </Typography>
                <Box mt={1} color="#f5a623">
                  {"⭐".repeat(current.stars)}
                </Box>
              </Box>
            </Paper>

            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: "-20px",
                zIndex: 1,
                bgcolor: "white",
                border: "1px solid #ccc",
              }}
            >
              <span style={{ fontSize: "24px" }}>→</span>
            </IconButton>
          </Box>
        </Box>

        <Box className="brands-logo">
          <h1 style={{ textAlign: "center", color: "black" }}>Partners</h1>
          <Box className="logo-frame">
            <Box className="logo-box">
              <Box className="logo-item">
                <div className="card-container">
                  <img
                    src={"/img/nikenew.jpg"}
                    alt="Nike"
                    className="brand-image"
                  />
                  <div className="card-info">
                    <p>
                      We started our partnership with Nike in 2010. Celebrities
                      like LeBron James and Serena Williams are among our
                      clients.
                    </p>
                  </div>
                </div>
              </Box>
              <Box className="logo-item">
                <div className="card-container">
                  <img
                    src={"/img/adidas.jpg"}
                    alt="Yeezy"
                    className="brand-image"
                  />
                  <div className="card-info">
                    <p>
                      Our collaboration with Adidas began in 2015. Famous
                      clients include Kanye West and David Beckham.
                    </p>
                  </div>
                </div>
              </Box>
              <Box className="logo-item">
                <div className="card-container">
                  <img
                    src={"/img/p.jpg"}
                    alt="Jordan"
                    className="brand-image"
                  />
                  <div className="card-info">
                    <p>
                      Puma joined our roster in 2012. Celebrities like Rihanna
                      and Usain Bolt are part of our exclusive clientele.
                    </p>
                  </div>
                </div>
              </Box>
              <Box className="logo-item">
                <div className="card-container">
                  <img
                    src={"/img/newbalance.jpg"}
                    alt="Puma"
                    className="brand-image"
                  />
                  <div className="card-info">
                    <p>
                      Our partnership with New Balance has been strong since
                      2017. Clients include athletes and influencers globally.
                    </p>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="address">
          <Container>
            <Stack className="address-area">
              <Box className="title">Address</Box>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511.2159024352745!2d72.36269442524981!3d40.75252656817365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bced91ccce77f9%3A0xf07c16e5c23a5945!2sNavruz%20Mall!5e0!3m2!1sen!2skr!4v1744611222692!5m2!1sen!2skr"
              />
            </Stack>
          </Container>
        </Box>
      </Stack>
    </Box>
  );
}
