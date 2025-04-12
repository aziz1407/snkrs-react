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

/** REDUX SLICE & SELECTOR **/
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark"; 
  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <Stack
      className="new-products-frame"
      sx={{
        width: "100%",
        height: 605,
        display: "flex",
        background: theme.palette.background.default, 
      }}
    >
      <Container>
        <Stack
          className="main"
          sx={{
            marginTop: 45,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            className="category-title"
            sx={{
              fontFamily: "Dancing Script",
              fontSize: 36,
              fontWeight: 700,
              lineHeight: "43px",
              color: theme.palette.text.primary,
            }}
          >
            Fresh Menu
          </Box>
          <Stack
            className="cards-frame"
            sx={{
              width: "100%",
              margin: "47px 2px 2px 2px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize + "size";
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        boxShadow: 3,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 6,
                        },
                        backgroundColor: isDark ? "#1e1e1e" : "#ffffff", 
                        color: isDark ? "#ffffff" : "#000000", 
                      }}
                    >
                      <CardOverflow>
                        <div
                          className="product-sale"
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: theme.palette.primary.main,
                            padding: "4px 8px",
                            borderRadius: "4px",
                            color: theme.palette.background.default,
                            fontSize: "0.8rem",
                          }}
                        >
                          {sizeVolume}
                        </div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={product.productName} />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow
                        className="product-detail"
                        sx={{
                          backgroundColor: theme.palette.background.default,
                          color: theme.palette.text.primary,
                          padding: 2,
                        }}
                      >
                        <Stack className="info">
                          <Stack flexDirection="row" alignItems="center">
                            <Typography
                              className="title"
                              sx={{
                                fontWeight: 600,
                                fontSize: "1rem",
                                color: theme.palette.text.primary,
                              }}
                            >
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography
                              className="price"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.text.secondary,
                              }}
                            >
                              ${product.productPrice}
                            </Typography>
                          </Stack>
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
                          <VisibilityIcon
                            sx={{
                              fontSize: 20,
                              marginLeft: "5px",
                            }}
                          />
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
