import React from "react";
import {
  Box,
  Container,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewArrival() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { newDishes } = useSelector(newDishesRetriever);
  const history = useHistory();

  const handleCardClick = (productId: string) => {
    history.push(`/products/${productId}`);
  };

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
            {newDishes.length !== 0 ? (
              newDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Card
                    key={product._id}
                    variant="outlined"
                    className="card"
                    sx={{
                      borderRadius: 4,
                      boxShadow: isDark ? 4 : 2,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                      color: isDark ? "#ffffff" : "#000000",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "auto",
                      minHeight: "450px",
                      maxHeight: "500px",
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
                        backgroundColor: "orange",
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
                    <CardMedia
                      component="img"
                      image={imagePath}
                      alt={product.productName}
                      sx={{
                        height: "350px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    />
                    <CardContent
                      className="product-detail"
                      sx={{
                        padding: "14px 16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        backgroundColor: isDark ? "#111" : "#fff",
                        borderTop: `1px solid ${isDark ? "#333" : "#f0f0f0"}`,
                        gap: "6px",
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        className="collection-label"
                        sx={{
                          fontSize: "11px",
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: isDark ? "#888" : "#757575",
                        }}
                      ></Typography>

                      <Typography
                        className="title"
                        sx={{
                          width: "100%",
                          fontSize: "15px",
                          fontWeight: 700,
                          color: isDark ? "#fff" : "#111",
                          margin: 0,
                          lineHeight: 1.3,
                          maxHeight: "40px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.productName}
                      </Typography>

                      <Box
                        className="size-price-container"
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >

                        <Typography
                          className="size"
                          sx={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: isDark ? "#bbb" : "#757575",
                          }}
                        >
                          Size: {product.productSize}
                        </Typography>

                        <Typography
                          className="price"
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: isDark ? "#ff4d4d" : "#e63946",
                            margin: 0,
                          }}
                        >
                          ${product.productPrice}
                        </Typography>
                      </Box>

                      <Box
                        className="rating"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            sx={{
                              fontSize: "16px",
                              color: "#FFC107", 
                            }}
                          />
                        ))}
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: isDark ? "#bbb" : "#757575",
                            marginLeft: "4px",
                          }}
                        >
                          (5.0)
                        </Typography>
                      </Box>

                      <Box
                        className="views"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                          fontWeight: 400,
                          color: isDark ? "#888" : "#9e9e9e",
                        }}
                      >
                        <VisibilityIcon
                          sx={{ fontSize: "14px", marginRight: "4px" }}
                        />
                        {product.productViews} views
                      </Box>
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
                New products are not available!
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
