import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation } from "swiper";

import { Product } from "../../../lib/data/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { setChosenProduct, setProducts, setAdmin } from "./slice";
import { retrieveChosenProduct, retrieveAdmin } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../../app/services/ProductService";
import MemberService from "../../../app/services/MemberService";
import { Member } from "../../../lib/data/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/data/types/search";
import NewArrival from "../homePage/NewArrival";

const actionDispatch = (dispatch: Dispatch) => ({
  setAdmin: (data: Member) => dispatch(setAdmin(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);

const adminRetriever = createSelector(retrieveAdmin, (admin) => ({ admin }));

interface ChosenProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setAdmin, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { admin } = useSelector(adminRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setAdmin(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;

  return (
    <div className="chosen-product">
      <Box className="title">Product Detail</Box>
      <Container className="product-wrapper">
        <Box className="image-section">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation]}
            className="custom-swiper"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={imagePath}
                    alt={chosenProduct.productName}
                    sx={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>

        <Box className="info-section">
          <div className="brand">{admin?.memberNick}</div>
          <div className="name">{chosenProduct?.productName}</div>
          <div className="category">{chosenProduct?.productCollection}</div>

          <div className="rating-row">
            <Rating name="rating" value={4.5} precision={0.5} readOnly />
            <span className="review-count">
              {chosenProduct.productViews || 0} reviews
            </span>
          </div>
          <div>{chosenProduct.productLeftCount} pairs left</div>
          <div className="price">${chosenProduct?.productPrice}</div>
          <Divider height="1" width="100%" bg="#EEEEEE" />

          <Button
            variant="contained"
            className="add-to-cart"
            onClick={(e) => {
              onAdd({
                _id: chosenProduct._id,
                quantity: 1,
                name: chosenProduct.productName,
                price: chosenProduct.productPrice,
                image: chosenProduct.productImages[0],
              });
              e.stopPropagation();
            }}
          >
            Shop Now
          </Button>

          <div className="delivery-msg">
            🚚 Free delivery on orders over $200
          </div>
        </Box>
      </Container>
    </div>
  );
}
