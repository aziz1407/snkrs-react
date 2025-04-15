import React from "react";
import { Box, Container, Stack, useTheme } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/data/enums/product.enum";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewArrival() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark"; 
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <Stack
      className="new-products-frame"
      sx={{
        width: "100%",
        display: "flex",
        background: theme.palette.background.default,
        paddingY: 8,
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          className="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            className="category-title"
            sx={{
              fontFamily: "sans-serif",
              fontSize: 36,
              fontWeight: 700,
              lineHeight: "43px",
              color: theme.palette.text.primary,
              mb: 4,
            }}
          >
            New Drops
          </Box>
          <Stack
            className="cards-frame"
            direction="row"
            spacing={3}
            flexWrap="wrap"
            justifyContent="center"
          >
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className="card"
                      sx={{
                        width: 300,
                        height: 390,
                        borderRadius: 4,
                        boxShadow: isDark ? 4 : 2,
                        transition: "transform 0.3s ease",
                        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                        color: isDark ? "#ffffff" : "#000000",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        '&:hover': {
                          transform: "scale(1.03)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardOverflow sx={{ position: "relative" }}>
                        <Box
                          className="product-sale"
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            zIndex: 10,
                            backgroundColor: "skyblue",
                            color: "#fff",
                            paddingX: 1.5,
                            paddingY: 0.5,
                            borderRadius: 5,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {product.productSize}
                        </Box>
                        <AspectRatio ratio={1}>
                          <img
                            src={imagePath} alt={product.productName}
                            style={{ borderRadius: "10px", objectFit: "cover" }}
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow
                        className="product-detail"
                        sx={{
                          backgroundColor: isDark ? "#111" : "#f9f9f9",
                          padding: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          borderTop: "1px solid #e0e0e0",
                        }}
                      >
                        <Stack
                          className="info"
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography className="title" sx={{ fontWeight: 600 }}>
                            {product.productName}
                          </Typography>
                          <Divider width="2" height="24" bg="#d9d9d9" />
                          <Typography className="price" sx={{ fontWeight: 600 }}>
                            ${product.productPrice}
                          </Typography>
                        </Stack>
                        <Typography
                          className="views"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {product.productViews}
                          <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box
                  className="no-data"
                  sx={{
                    fontSize: "1rem",
                    color: theme.palette.text.secondary,
                    textAlign: "center",
                    marginTop: 3,
                  }}
                >
                  New products are not available!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}