import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import { useTheme } from "@mui/material/styles";

/** REDUX SLICE & SELECTOR **/
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <div
      className="popular-dishes-frame"
      style={{ background: theme.palette.background.default }}
    >
      <Container>
        <Stack className="popular-section">
          <Box
             sx={{
              fontFamily: "'Dancing Script'",
              fontSize: 36,
              fontWeight: 700,
              lineHeight: "43px",
              color: theme.palette.text.primary,
            }}
            className="category-title"
          >
            Popular Dishes
          </Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`; // Declare here
                return (
                  <CssVarsProvider key={product._id}>
                    <Card
                      className="card"
                      sx={{
                        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                        color: isDark ? "#ffffff" : "#000000",
                        borderRadius: "12px",
                      }}
                    >
                      <CardCover>
                        <img src={imagePath} alt={product.productName} />
                      </CardCover>

                      <CardCover className="card-cover" />

                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <Typography
                            level="h2"
                            fontSize="lg"
                            sx={{ color: isDark ? "#fff" : "#000", mb: 1 }}
                          >
                            {product.productName}
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: isDark ? "#aaa" : "#444",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {product.productViews}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          borderColor: isDark ? "#333" : "#ccc",
                          backgroundColor: isDark ? "#171717" : "#f5f5f5",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          sx={{ color: isDark ? "#ccc" : "#444" }}
                        >
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">New products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
