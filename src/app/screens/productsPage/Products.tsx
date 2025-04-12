import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, InputBase, Stack } from "@mui/material";
import Button from "@mui/material/Button"; // MUI Button
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles/CssVarsProvider";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";

import { Product, ProductInquiry } from "../../../lib/data/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../../app/services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/data/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());

  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1; //always stays on page 1
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch }); //new ref:
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const PaginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack className={"avatar-big-box"}>
          <Stack className="container-top">
            <Typography className="container-top-text">
              Burak Restaurant
            </Typography>
            <Stack className="search-bar">
              <InputBase
                className="input-text"
                placeholder="Type here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                className="for-btn"
                endIcon={<SearchIcon />}
                variant="contained"
                onClick={searchProductHandler}
                style={{
                  height: "25px",
                  borderRadius: "18px",
                  backgroundColor: "#D7B586;",
                  color: "#gold",
                  fontSize: "10px",
                }}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className="dishes-filter-box">
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className="category-main">
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Meals
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drinks
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Dessert
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
              </div>

              <Stack className={"meals-list"}>
                <CssVarsProvider>
                  {products.length !== 0 ? (
                    products.map((product: Product) => {
                      const imagePath = `${serverApi}/${product.productImages[0]}`;
                      const sizeVolume =
                        product.productCollection === ProductCollection.DRINK
                          ? product.productVolume + "litre"
                          : product.productSize + "size";
                      return (
                        <Card
                          key={product._id}
                          variant="outlined"
                          className="card"
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          <CardOverflow>
                            <div className="hover-container">
                              <div className="product-sale">{sizeVolume}</div>
                              <AspectRatio ratio="1">
                                <img
                                  src={imagePath}
                                  alt=""
                                  style={{ borderRadius: "0px 50px 0px 0px" }}
                                />
                              </AspectRatio>
                              <button
                                className="shop-btn"
                                onClick={(e) => {
                                  onAdd({
                                    _id: product._id,
                                    quantity: 1,
                                    name: product.productName,
                                    price: product.productPrice,
                                    image: product.productImages[0],
                                  });
                                  e.stopPropagation();
                                }}
                              >
                                <img
                                  src="/icons/shopping-cart.svg"
                                  style={{ display: "flex" }}
                                />
                              </button>
                              <Box className="removedredeye-btn">
                                {product.productViews}
                                <img src="/icons/eye.svg" />
                              </Box>
                            </div>
                          </CardOverflow>
                          <Typography className="title">
                            {product.productName}
                          </Typography>
                          <Stack className="product-desc">
                            <Box className="price-icon">
                              <img src="/icons/dollar.png" alt="" />
                            </Box>
                            <Typography className="price">
                              {product.productPrice}
                            </Typography>
                          </Stack>
                        </Card>
                      );
                    })
                  ) : (
                    <Box className="no-data">
                      New products are not available!
                    </Box>
                  )}
                </CssVarsProvider>
              </Stack>
            </Stack>
          </Stack>
          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              color="secondary"
              onChange={PaginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      {/* <div className={"brands-logo"}>
        <Stack className="logo-frame">
          <Box className="brand-name">Our Family Brands</Box>
          <Stack className="logo-box">
            <Box className="box-1"></Box>
            <Box className="box-2"></Box>
            <Box className="box-3"></Box>
            <Box className="box-4"></Box>
          </Stack>
        </Stack>
      </div> */}

      {/* <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              width="1320"
              height="1000"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3925601988574!2d55.27812847531649!3d25.193269077772765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6955cdc0a649%3A0xf08ece466df23124!2sCZN%20Burak%20Dubai!5e0!3m2!1sen!2sus!4v1705349427043!5m2!1sen!2sus"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div> */}
    </div>
  );
}
