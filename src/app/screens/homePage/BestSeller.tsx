import React from "react";
import { Box, Container, Stack, Typography, Button, useMediaQuery, Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

const bestSellerRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({
    product: popularDishes[0], // just pick first one
  })
);

export default function BestSeller() {
  const { product } = useSelector(bestSellerRetriever);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery("(max-width: 768px)");
  const history = useHistory();

  const handleCardClick = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  if (!product) return null;
  const imagePath = `${serverApi}/${product.productImages[0]}`;

  return (
    <Box className={`best-seller-section ${isDark ? 'dark-mode' : ''}`}>
      <Container>
        <Typography variant="h4">Best Seller</Typography>
        
        <Stack direction={isMobile ? "column" : "row"} className="product-container">
          <Box className="product-image-container">
            <img 
              src={imagePath} 
              alt={product.productName} 
              className="product-image"
            />
          </Box>
          
          <Box className="product-details">
            <Typography variant="h5" className="product-name">Air Jordan</Typography>
            
            <Typography variant="body1" className="product-description">
              Experience the perfect blend of heritage and innovation with the Best Seller Air Jordan. Designed for style
              and built for performance, these iconic sneakers offer premium comfort, bold aesthetics, and timeless
              appeal.
            </Typography>
            
            <Stack direction="row" className="price-container">
              <Typography variant="h6" className="original-price">$250</Typography>
              <Typography variant="h5" className="sale-price">$199</Typography>
            </Stack>
            
            <Box className="rating-container">
              <Rating value={4.5} precision={0.5} readOnly size="small" />
              <Typography variant="body2" className="rating-value">4.5</Typography>
            </Box>
            
            <Typography variant="body2" className="reviews">
              120 Reviews
            </Typography>
            
            <Typography variant="body2" className="views">
              {product.productViews} views
            </Typography>
            
            <Button 
              className="shop-button" sx={{background: "orange"}}
              onClick={() => handleCardClick(product._id)}
            >
              Shop now
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}