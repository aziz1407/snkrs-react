import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retreiveNewDrops } from "./selector";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Select new dishes from the Redux store
const newDropsRetriever = createSelector(retreiveNewDrops, (newDrops) => ({
  newDrops,
}));

const NewArrival: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { newDrops } = useSelector(newDropsRetriever);
  const history = useHistory();
  const swiperRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (productId: string): void => {
    history.push(`/products/${productId}`);
  };

  const handleSeeAllClick = (): void => {
    history.push("/products");
  };

  const handleNext = (): void => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const handlePrev = (): void => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const renderPaginationDots = (): JSX.Element => {
    // Assuming we want to show 5 pagination dots
    return (
      <div className="pagination-dots">
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <span
            key={index}
            className={`pagination-dot ${index === 4 ? "active" : ""}`}
          ></span>
        ))}
      </div>
    );
  };

  return (
    <div className={`new-products-frame ${isDark ? "dark-theme" : ""}`}>
      <div className="container">
        <div className="main">
          <div className="header-container">
            <div className="category-title">
              New Drops
            </div>
            <div className="navigation-container">
              <button className="see-all-btn" onClick={handleSeeAllClick}>
                See All
                <ArrowForwardIcon className="arrow-icon" />
              </button>
              <div className="arrow-buttons">
                <button className="arrow-btn prev" onClick={handlePrev}>
                  <ArrowBackIcon />
                </button>
                <button className="arrow-btn next" onClick={handleNext}>
                  <ArrowForwardIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="cards-frame" ref={swiperRef}>
            {newDrops.length !== 0 ? (
              newDrops.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <div
                    key={product._id}
                    className="card"
                    onClick={() => handleCardClick(product._id)}
                  >
                    <div className="product-sale">
                      {product.productSize}
                    </div>
                    <div className="card-media">
                      <img src={imagePath} alt={product.productName} />
                    </div>
                    <div className="product-detail">
                      <div className="title">
                        {product.productName}
                      </div>

                      <div className="size-price-container">
                        <div className="size">
                          Stock: {product.productLeftCount} pairs left
                        </div>
                        <div className="price">
                          ${product.productPrice}
                        </div>
                      </div>

                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} className="star-icon" />
                        ))}
                        <span className="rating-count">(5.0)</span>
                      </div>

                      <div className="views">
                        <VisibilityIcon className="view-icon" />
                        {product.productViews} views
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-data">
                New products are not available!
              </div>
            )}
          </div>
          
          {renderPaginationDots()}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;