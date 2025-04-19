import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Container,
  InputBase,
  Stack,
  Popover,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

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
    productCollection: ProductCollection.NIKE,
    search: "",
  });

  const demoColors = {
    nike: ["#FF0000", "#000000", "#FFFFFF", "#0000FF", "#00FF00"],
    adidas: ["#000000", "#FFFFFF", "#0000FF", "#FF0000", "#FFFF00"],
    puma: ["#000000", "#FFFFFF", "#808080", "#FFA500", "#800080"],
    new_balance: ["#000000", "#FFFFFF", "#A52A2A", "#008000", "#FFC0CB"],
  };

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
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

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get brand name for display
  const getBrandDisplayName = (collection: ProductCollection) => {
    switch (collection) {
      case ProductCollection.NIKE:
        return "Nike";
      case ProductCollection.ADIDAS:
        return "Adidas";
      case ProductCollection.PUMA:
        return "Puma";
      case ProductCollection.NEW_BALANCE:
        return "New Balance";
      default:
        return "All Brands";
    }
  };

  const getColorsByBrand = (brand: string) => {
    const lowerBrand = brand.toLowerCase();
    if (lowerBrand.includes("nike")) return demoColors.nike;
    if (lowerBrand.includes("adidas")) return demoColors.adidas;
    if (lowerBrand.includes("puma")) return demoColors.puma;
    if (lowerBrand.includes("new balance") || lowerBrand.includes("nb"))
      return demoColors.new_balance;
    return demoColors.nike; // Default
  };

  return (
    <div className="products-page">
      <Container maxWidth="xl">
        <Box
          className="category-navigation"
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            className="filter-sort-btn"
            onClick={handleFilterClick}
            disableElevation
          >
            FILTER & SORT
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              px: 2,
              py: 0.5,
              backgroundColor: "#f9f9f9",
            }}
          >
            <InputBase
              placeholder="Search sneakers..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProductHandler();
                }
              }}
              sx={{ mr: 1, minWidth: "200px", color: "black"}}
            />
            <IconButton onClick={searchProductHandler} size="small">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className="filter-popover"
        >
          <Box className="filter-popover-content">
            <Box
              className="filter-header"
              sx={{ display: "flex", width: "200px" }}
            >
              <Typography variant="h6" sx={{ justifyContent: "flex-end" }}>
                Filter & Sort
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider />

            <Box className="filter-section" sx={{ marginLeft: "10px" }}>
              <Typography variant="subtitle1" className="filter-title">
                Sort By
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={productSearch.order === "createdAt"}
                      onChange={() => searchOrderHandler("createdAt")}
                      size="small"
                    />
                  }
                  label="Newest"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={productSearch.order === "productPrice"}
                      onChange={() => searchOrderHandler("productPrice")}
                      size="small"
                    />
                  }
                  label="Price"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={productSearch.order === "productViews"}
                      onChange={() => searchOrderHandler("productViews")}
                      size="small"
                    />
                  }
                  label="Most Viewed"
                />
              </FormGroup>
            </Box>

            <Divider />

            <Box className="filter-section" sx={{ marginLeft: "10px" }}>
              <Typography variant="subtitle1" className="filter-title">
                Brand
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        productSearch.productCollection ===
                        ProductCollection.NIKE
                      }
                      onChange={() =>
                        searchCollectionHandler(ProductCollection.NIKE)
                      }
                      size="small"
                    />
                  }
                  label="Nike"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        productSearch.productCollection ===
                        ProductCollection.ADIDAS
                      }
                      onChange={() =>
                        searchCollectionHandler(ProductCollection.ADIDAS)
                      }
                      size="small"
                    />
                  }
                  label="Adidas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        productSearch.productCollection ===
                        ProductCollection.PUMA
                      }
                      onChange={() =>
                        searchCollectionHandler(ProductCollection.PUMA)
                      }
                      size="small"
                    />
                  }
                  label="Puma"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        productSearch.productCollection ===
                        ProductCollection.NEW_BALANCE
                      }
                      onChange={() =>
                        searchCollectionHandler(ProductCollection.NEW_BALANCE)
                      }
                      size="small"
                    />
                  }
                  label="New Balance"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        productSearch.productCollection ===
                        ProductCollection.MIX
                      }
                      onChange={() =>
                        searchCollectionHandler(ProductCollection.MIX)
                      }
                      size="small"
                    />
                  }
                  label="All Brands"
                />
              </FormGroup>
            </Box>
          </Box>
        </Popover>

        <Box className="products-grid">
          {products.length > 0 ? (
            products.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              const brandName = getBrandDisplayName(
                product.productCollection || ProductCollection.MIX
              );
              const colors = getColorsByBrand(brandName);

              return (
                <Box
                  key={product._id}
                  className="product-card"
                  onClick={() => chooseDishHandler(product._id)}
                >
                  <Box className="product-image-container">
                    <img
                      src={imagePath}
                      alt={product.productName}
                      className="product-image"
                    />
                    <Button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdd({
                          _id: product._id,
                          quantity: 1,
                          name: product.productName,
                          price: product.productPrice,
                          image: product.productImages[0],
                        });
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>

                  <Box className="product-info">
                    <Typography className="product-price">
                      ${product.productPrice}
                    </Typography>
                    <Typography className="product-name">
                      {product.productName}
                    </Typography>
                    <Typography className="product-brand">
                      {brandName}
                    </Typography>

                    <Box
                      className="product-colors"
                      sx={{ display: "flex", flexDirection: "row" }}
                    >
                      {colors.map((color, index) => (
                        <Box
                          key={index}
                          className="color-dot"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <Typography className="color-count">
                        {colors.length} colors
                      </Typography>
                    </Box>

                    <Box className="product-badges">
                      {product.productViews > 1 && (
                        <span className="badge best-seller">Best Seller</span>
                      )}
                      {new Date(product.createdAt).getTime() >
                        Date.now() - 30 * 24 * 60 * 60 * 1000 && (
                        <span className="badge new-arrival">New</span>
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box className="no-products">
              <Typography>No products available</Typography>
            </Box>
          )}
        </Box>

        <Box className="pagination-container">
          <Pagination
            count={
              products.length !== 0
                ? productSearch.page + 1
                : productSearch.page
            }
            page={productSearch.page}
            onChange={PaginationHandler}
            color="primary"
            shape="rounded"
            sx={{background: "grey", borderRadius: "3px"}}
          />
        </Box>
      </Container>
    </div>
  );
}
