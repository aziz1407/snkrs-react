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
    productCollection: ProductCollection.MIX,
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
                    productSearch.productCollection === ProductCollection.MIX
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.MIX)
                  }
                >
                  Mix
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.NIKE
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.NIKE)
                  }
                >
                  Nike
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.ADIDAS
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.ADIDAS)
                  }
                >
                  Adidas
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.PUMA
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.PUMA)
                  }
                >
                  Puma
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.NEW_BALANCE
                      ? "primary"
                      : "secondary"
                  }
                  className={"btns"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.NEW_BALANCE)
                  }
                >
                  NB
                </Button>
              </div>

              <Stack className={"meals-list"}>
                <CssVarsProvider>
                  {products.length !== 0 ? (
                    products.map((product: Product) => {
                      const imagePath = `${serverApi}/${product.productImages[0]}`;
                      return (
                        <Card
                          key={product._id}
                          variant="outlined"
                          className="card"
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          <CardOverflow>
                            <div className="hover-container">
                              {/* <div className="product-sale">{sizeVolume}</div> */}
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
    </div>
  );
}
