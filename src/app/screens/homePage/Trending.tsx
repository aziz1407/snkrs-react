import React from "react";
import {
  Box,
  Container,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function Trending() {
  const { popularDishes } = useSelector(popularDishesRetriever);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const history = useHistory();

  const handleCardClick = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  return (
    <Stack
      className="popular-dishes-frame"
      sx={{
        width: "100%",
        display: "flex",
        background: theme.palette.background.default,
        paddingY: 8,
        marginBottom: 10,
        marginTop: "20px",
        overflow: "visible",
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
           Trending
          </Box>
          <Stack
            className="cards-frame"
            direction="row"
            spacing={3}
            flexWrap="wrap"
            justifyContent="center"
          >
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Card
                    key={product._id}
                    variant="outlined"
                    className="card"
                    sx={{
                      width: 335,
                      height: 350,
                      borderRadius: 4,
                      boxShadow: isDark ? 4 : 2,
                      transition: "transform 0.3s ease",
                      backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                      color: isDark ? "#ffffff" : "#000000",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative", 
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => handleCardClick(product._id)}
                  >
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
                      {product.productLeftCount} left
                    </Box>
                    <CardMedia
                      component="img"
                      image={imagePath}
                      alt={product.productName}
                      sx={{
                        height: "85%",
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <CardContent
                      className="product-detail"
                      sx={{
                        backgroundColor: isDark ? "#111" : "#f9f9f9",
                        padding: 2,
                        display: "flex",
                        gap: 1,
                        borderTop: "1px solid #e0e0e0",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack
                        className="info"
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                      >
                        <Typography className="title" sx={{ fontWeight: 600 }}>
                          {product.productName}
                        </Typography>
                        <Divider height="24" bg="#d9d9d9" />
                        <Typography className="price" sx={{ fontWeight: 600, marginLeft: "10px" }}>
                          ${product.productPrice}
                        </Typography>
                      </Stack>
                      <Typography
                        className="views"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {product.productViews}
                        <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardContent>
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
                Popular dishes are not available!
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
